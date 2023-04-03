import { CONTRACTS } from '@config';
import { useVendorsContext } from '@contexts/vendors';
import { Grid } from '@mui/material';
import { HistoryTable } from '@sections/transactionTable';
import { ChainCacheService } from '@services/chaincache';
import { useProject } from '@services/contracts/useProject';
import truncateEthAddress from '@utils/truncateEthAddress';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import BasicInfoCard from './BasicInfoCard';
import { MapView } from './maps';
import TokenDetails from './TokenDetails';

const TRANSACTION_TABLE_HEADER_LIST = {
  timestamp: {
    id: 'timestamp',
    label: 'Date',
    align: 'left',
  },
  txHash: {
    id: 'txHash',
    label: 'Transaction Hash',
    align: 'left',
  },
  beneficiary: {
    id: 'beneficiary',
    label: 'Beneficiary',
    align: 'left',
  },
  amount: {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },
};

export default function VendorView() {
  const { contracts } = useAuthContext();
  const { getVendorById, setChainData, chainData, refresh, getVillageVendors, singleVendor } = useVendorsContext();
  const {
    getVendorAllowance,
    checkActiveVendor,
    communityContract,
    pendingWheelsToAccept,
    getProjectBalance,
    h2oToken,
    getVendorBalance,
  } = useProject();
  const {
    query: { vendorId },
  } = useRouter();

  const [transactions, setTransactions] = React.useState([]);

  const init = useCallback(async () => {
    if (!vendorId) return;
    const _vendorData = await getVendorById(vendorId);
    if (!_vendorData?.walletAddress) return;
    if (!communityContract) return;
    let token;
    const isActive = await checkActiveVendor(_vendorData?.walletAddress);
    const pendingTokens = await pendingWheelsToAccept(_vendorData?.walletAddress);
    const vendorBalance = await getVendorBalance(_vendorData?.walletAddress);
    const allowance = await getVendorAllowance(_vendorData?.walletAddress);
    if (h2oToken) token = await getProjectBalance();

    setChainData({
      isActive,
      pendingTokens,
      projectBalance: token ? token : null,
      allowance,
      vendorBalance,
    });
  }, [vendorId, refresh, communityContract]);

  const fetchTransactionList = async () => {
    try {
      const {
        data: { rows },
      } = await ChainCacheService.listTransactionsByVendor(
        contracts[CONTRACTS.CVAPROJECT],
        singleVendor?.walletAddress
      );
      console.log(rows);
      const formatted = rows.map((tx) => ({
        ...tx,
        beneficiary: truncateEthAddress(tx.params.find((param) => param.name === 'beneficiary')?.value),
        amount: tx.params.find((param) => param.name === 'amount')?.value,
      }));
      setTransactions(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!vendorId) return;
    if (!singleVendor?.villageId) return;
    getVillageVendors(singleVendor?.villageId);
    fetchTransactionList();
  }, [vendorId, singleVendor?.walletAddress]);

  return (
    <>
      {' '}
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <TokenDetails chainData={chainData} />
        </Grid>
        <Grid item xs={12} md={5}>
          <BasicInfoCard chainData={chainData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <HistoryTable tableHeadersList={TRANSACTION_TABLE_HEADER_LIST} tableRowsList={transactions} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MapView />
        </Grid>
      </Grid>
    </>
  );
}
