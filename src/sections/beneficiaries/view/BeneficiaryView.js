import { useCallback, useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import TokenDetails from './TokenDetails';
import MoreInfoCard from './MoreInfoCard';
import { HistoryTable } from '@sections/transactionTable';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';
import ActionMenu from './ActionMenu';

BeneficiaryView.propTypes = {};

// #region Table Headers
const TABLE_HEAD = {
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
  vendor: {
    id: 'vendor',
    label: 'Vendor',
    align: 'left',
  },
  amount: {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },
};
// #endregion

export default function BeneficiaryView() {
  const { roles } = useAuthContext();
  const { getBeneficiaryById, setChainData, chainData, refresh, refreshData } = useBeneficiaryContext();

  const {
    query: { beneficiaryId },
  } = useRouter();

  const init = useCallback(async () => {
    if (!beneficiaryId) return;
    const _benData = await getBeneficiaryById(beneficiaryId);
    //getBeneficiaryClaimLogs(_benData?.phone);
    if (!_benData?.phone) return;
    // const _chainData = await beneficiaryBalance(_benData?.phone);
    // setChainData(_chainData);
  }, [beneficiaryId, refresh]);

  useEffect(() => {
    init();
    // RahatCash?.on('Approval', refreshData);
    // RahatCash?.on('Transfer', refreshData);
    // contractWS?.on('IssuedERC20', refreshData);
    // return () => {
    //   contractWS?.removeAllListeners();
    //   RahatCash?.removeAllListeners();
    // };
  }, [init]);

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
          <TokenDetails />
        </Grid>
      </Grid>
      <Stack sx={{ mt: 1 }}>
        <HistoryTable tableHeadersList={TABLE_HEAD} tableRowsList={[]} />
      </Stack>
    </>
  );
}
