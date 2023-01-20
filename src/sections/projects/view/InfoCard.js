import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import SummaryCard from '@components/SummaryCard';
import { useProject } from '@services/contracts/useProject';
import useDialog from '@hooks/useDialog';
import AmountForm from '../cash-tracker/AmountForm';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import useLoading from '@hooks/useLoading';
import { useAuthContext } from 'src/auth/useAuthContext';
import { role } from 'src/_mock/assets';

export default function InfoCard({}) {
  const { getProjectBalance, h2oToken } = useProject();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { sendCashToProject } = useRahatDonor();
  const { beneficiaryCount } = useProjectContext();
  const { roles } = useAuthContext();

  const sx = { borderRadius: 2 };
  const [balance, setBalance] = useState(0);

  const { loading, showLoading, hideLoading } = useLoading();

  const handleAddBudgetModel = () => {
    showDialog();
  };

  const CashActions = {
    async sendCashToProject(amount) {
      if(!roles.isDonor) return;
      showLoading('cashTransfer');
      await sendCashToProject(amount);
      hideLoading('cashTransfer');
    },
  };

  //TODO : fix issues on hooks
  // const getBalance = useCallback(async () => {
  //   if (!h2oToken) return;
  //   try {
  //     let amt = await getProjectBalance();
  //     setBalance(amt);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [h2oToken]);

  // useEffect(async () => {
  //   getBalance();
  // }, [getBalance]);

  return (
    <>
      <AmountForm
        title="Add Budget in Project"
        description={<>Please enter the budget you wish to add to project</>}
        approveCashTransfer={CashActions.sendCashToProject}
        handleClose={hideDialog}
        open={isDialogShow}
      />
      <Grid container alignItems="flex-start" justifyContent="center" paddingTop={3}>
        <Grid item xs={12} md={4} style={{ padding: '8px' }}>
          <SummaryCard
            color="warning"
            icon="material-symbols:person-4"
            title="Beneficiaries"
            total={beneficiaryCount}
            subtitle={'households'}
            sx={sx}
          />
        </Grid>

        <Grid item xs={12} md={4} style={{ padding: '8px' }}>
          <SummaryCard
            color="success"
            icon="material-symbols:token"
            title="Token Issued"
            total={
              balance || balance <= 0 ? (
                roles.isDonor ? (
                  <Button onClick={handleAddBudgetModel}> Add Budget</Button>
                ) : (
                  balance
                )
              ) : (
                balance
              )
            }
            subtitle={balance || balance > 0 ? 'tokens' : '  '}
            sx={sx}
          />
        </Grid>
        <Grid item xs={12} md={4} style={{ padding: '8px' }}>
          <SummaryCard
            color="error"
            icon="ph:currency-circle-dollar-light"
            title="Token Redemed"
            total="0"
            subtitle={'tokens'}
            sx={sx}
          />
        </Grid>
      </Grid>
    </>
  );
}
