import { useCallback, useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import TokenDetails from './TokenDetails';
import MoreInfoCard from './MoreInfoCard';
import { HistoryTable } from '@sections/transactionTable';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useProject } from '@services/contracts/useProject';

BeneficiaryView.propTypes = {};

// #region Table Headers
const TABLE_HEAD = {
  timestamp: {
    id: 'timestamp',
    label: 'Timestamp',
    align: 'left',
  },
  txHash: {
    id: 'txHash',
    label: 'Transaction Hash',
    align: 'left',
  },
  event: {
    id: 'event',
    label: 'Type',
    align: 'left',
  },
  amount: {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },
  txType: {
    id: 'txType',
    label: 'TxType',
    align: 'left',
  },
  mode: {
    id: 'mode',
    label: 'Mode',
    align: 'left',
  },
};
// #endregion

export default function BeneficiaryView() {
  const { roles } = useAuthContext();
  const { getBeneficiaryById, refresh, singleBeneficiary, getTransactionById, transaction } = useBeneficiaryContext();
  const { checkActiveBeneficiary, communityContract, beneficiaryBalance } = useProject();
  const {
    query: { beneficiaryId },
  } = useRouter();

  const [chainData, setChainData] = useState({
    isBenActive: null,
    balance: null,
  });

  const init = useCallback(async () => {
    if (!beneficiaryId) return;
    const _benData = await getBeneficiaryById(beneficiaryId);
    await getTransactionById(beneficiaryId);
    //getBeneficiaryClaimLogs(_benData?.phone);
    if (!_benData?.phone) return;
    // const _chainData = await beneficiaryBalance(_benData?.phone);
    // setChainData(_chainData);
  }, [beneficiaryId, refresh]);

  const fetchChainData = useCallback(async () => {
    if (!communityContract) return;
    if (!singleBeneficiary) return;

    try {
      const isBenActive = await checkActiveBeneficiary(singleBeneficiary?.data?.walletAddress);
      const balance = await beneficiaryBalance(singleBeneficiary?.data?.walletAddress);
      setChainData((prev) => ({ ...prev, isBenActive, balance }));
    } catch (error) {}
  }, [communityContract, singleBeneficiary, refresh]);

  useEffect(() => {
    fetchChainData();
  }, [fetchChainData, refresh, communityContract]);

  useEffect(() => {
    init();
  }, [init]);

  const TokenDetailsProps = {
    chainData,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <BasicInfoCard chainData={chainData} />
          {roles.isManager && (
            <Stack>
              <MoreInfoCard />
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <TokenDetails {...TokenDetailsProps} />
        </Grid>
      </Grid>
      <Stack sx={{ mt: 1 }}>
        <HistoryTable tableHeadersList={TABLE_HEAD} tableRowsList={transaction.data} />
      </Stack>
    </>
  );
}
