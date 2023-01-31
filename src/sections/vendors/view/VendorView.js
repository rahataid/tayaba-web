import React, { useCallback, useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import TokenDetails from './TokenDetails';
import { HistoryTable } from '@sections/transactionTable';
import { useVendorsContext } from '@contexts/vendors';
import { useRouter } from 'next/router';
import { useProject } from '@services/contracts/useProject';

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
  const { getVendorById, setChainData, chainData, refresh } = useVendorsContext();
  const {
    getVendorAllowance,
    checkActiveVendor,
    communityContract,
    pendingWheelsToAccept,
    getProjectBalance,
    h2oToken,
  } = useProject();
  const {
    query: { vendorId },
  } = useRouter();

  const init = useCallback(async () => {
    if (!vendorId) return;
    const _vendorData = await getVendorById(vendorId);
    if (!_vendorData?.walletAddress) return;
    if (!communityContract) return;
    let token;
    const allowance = await getVendorAllowance(_vendorData?.walletAddress);
    const isActive = await checkActiveVendor(_vendorData?.walletAddress);
    const cashAllowance = await pendingWheelsToAccept(_vendorData?.walletAddress);
    if (h2oToken) token = await getProjectBalance();

    setChainData({
      allowance: allowance.toNumber(),
      isActive,
      cashAllowance: cashAllowance.toNumber(),
      projectBalance: token ? token : null,
    });
  }, [vendorId, refresh, communityContract]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      {' '}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BasicInfoCard chainData={chainData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TokenDetails chainData={chainData} />
        </Grid>
      </Grid>
      <Stack sx={{ mt: 1 }}>
        <HistoryTable tableHeadersList={TRANSACTION_TABLE_HEADER_LIST} tableRowsList={[]} />
      </Stack>
    </>
  );
}
