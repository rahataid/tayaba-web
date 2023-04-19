import { CONTRACTS } from '@config';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { Grid, Stack } from '@mui/material';
import { HistoryTable } from '@sections/transactionTable';
import { useProject } from '@services/contracts/useProject';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import BasicInfoCard from './BasicInfoCard';
import MoreInfoCard from './MoreInfoCard';
import TokenDetails from './TokenDetails';

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
    label: 'Event',
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
  const { roles, contracts } = useAuthContext();
  const {
    getBeneficiaryById,
    refresh,
    singleBeneficiary,
    getBeneficiaryTransactions,
    transaction,
    getBeneficiaryByWalletAddress,
  } = useBeneficiaryContext();
  const { checkActiveBeneficiary, communityContract, beneficiaryBalance } = useProject();
  const {
    query: { beneficiaryId },
  } = useRouter();
  const { handleContractError, handleError } = useErrorHandler();

  const [chainData, setChainData] = useState({
    isBenActive: null,
    balance: null,
  });

  useEffect(() => {
    getBeneficiaryByWalletAddress(beneficiaryId);
    getBeneficiaryTransactions(contracts[CONTRACTS.CVAPROJECT], beneficiaryId).catch(handleError);
  }, [beneficiaryId]);

  // const init = useCallback(async () => {
  //   if (!beneficiaryId) return;
  //   const _benData = await getBeneficiaryByWalletAddress(beneficiaryId);

  //   // getBeneficiaryClaimLogs(_benData?.phone);
  //   if (!_benData?.phone) return;
  //   const _chainData = await beneficiaryBalance(_benData?.phone);
  //   console.log('_chainData', _chainData);
  //   setChainData(_chainData);
  // }, [beneficiaryId, refresh]);

  // useEffect(() => {
  //   init();
  // }, []);

  const fetchChainData = useCallback(async () => {
    if (!communityContract) return;
    if (!singleBeneficiary) return;
    checkActiveBeneficiary(singleBeneficiary?.data?.walletAddress)
      .then((isActive) => {
        console.log('isActive', isActive);
        if (isActive) {
          beneficiaryBalance(singleBeneficiary?.data?.walletAddress)
            .then((balance) => {
              console.log('balance', balance);
              setChainData((prev) => ({ ...prev, isBenActive: isActive, balance }));
            })
            .catch(handleContractError);
        }
      })
      .catch(handleContractError);
  }, [communityContract, singleBeneficiary, refresh]);

  useEffect(() => {
    fetchChainData();
  }, [fetchChainData, refresh, communityContract]);

  // useEffect(() => {
  //   init();
  // }, [init]);

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
        <HistoryTable tableHeadersList={TABLE_HEAD} tableRowsList={transaction} />
      </Stack>
    </>
  );
}
