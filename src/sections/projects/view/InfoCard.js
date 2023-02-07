import React, { useState } from 'react';
import { Grid, Button } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import SummaryCard from '@components/SummaryCard';
import useDialog from '@hooks/useDialog';
import AmountForm from '../cash-tracker/AmountForm';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import useLoading from '@hooks/useLoading';
import { useAuthContext } from 'src/auth/useAuthContext';

export default function InfoCard({ chainData }) {
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { sendCashToProject } = useRahatDonor();
  const { beneficiaryCount, singleProject } = useProjectContext();
  const { roles } = useAuthContext();

  const sx = { borderRadius: 2 };

  const { loading, showLoading, hideLoading } = useLoading();

  const handleAddBudgetModel = () => {
    showDialog();
  };

  const CashActions = {
    async sendCashToProject(amount) {
      if (!roles.isDonor) return;
      showLoading('cashTransfer');
      await sendCashToProject(amount);
      hideLoading('cashTransfer');
    },
  };

  return (
    <>
      <AmountForm
        title="Add Relief Items in Project"
        description={<>Please enter the Relief item you wish to add to project</>}
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
            title="Relief Items"
            total={
              chainData.projectBalance <= 0 ? (
                roles.isDonor ? (
                  <Button onClick={handleAddBudgetModel}>Add Relief Items</Button>
                ) : (
                  chainData.projectBalance
                )
              ) : (
                chainData.projectBalance
              )
            }
            subtitle="H20 Wheels"
            sx={sx}
          />
        </Grid>
        <Grid item xs={12} md={4} style={{ padding: '8px' }}>
          <SummaryCard
            color="error"
            icon="ph:currency-circle-dollar-light"
            title="Distributed"
            total={singleProject?.data?.disbursed || 0}
            subtitle={'H20 Wheels'}
            sx={sx}
          />
        </Grid>
      </Grid>
    </>
  );
}
