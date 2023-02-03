import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography, Button, Alert } from '@mui/material';
import ActionMenu from './ActionMenu';
import CreateTokenDialog from '../cash-tracker/CreateTokenDialog';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import AmountForm from '../cash-tracker/AmountForm';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'notistack';

const TitleCard = ({}) => {
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { roles } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingKey, setLoadingKey] = useState(null);
  const {
    push,
    query: { projectId },
  } = useRouter();
  const [assignTokenDialog, setAssignTokenDialog] = useState(false);
  const { sendCashToProject } = useRahatDonor();

  const handleClose = () => {
    setAssignTokenDialog(false);
    hideDialog();
  };

  const handleAssignTokenModal = () => {
    setAssignTokenDialog((prev) => !prev);
  };

  const handleAddBudgetModel = () => {
    showDialog();
  };

  const CashActions = {
    async sendCashToProject(amount) {
      await sendCashToProject(amount);
      setLoadingKey('cashTransfer');
      enqueueSnackbar('Added Budget to Project');
    },
  };

  const handleBeneficiaryRouteAction = () => {
    push(`/projects/${projectId}/beneficiaries`);
  };

  const menuItems = [
    {
      onClick: handleAssignTokenModal,
      name: 'Assign Token',
      show: roles?.isAdmin,
    },
    {
      onClick: handleAddBudgetModel,
      name: 'Create H20Wheel Tokens',
      show: roles.isDonor,
    },
    {
      onClick: handleAddBudgetModel,
      name: 'Lock Project',
      show: roles.isDonor,
    },
    {
      onClick: handleAddBudgetModel,
      name: 'Unlock Project',
      show: roles.isDonor,
    },
  ];

  return (
    <>
      <CreateTokenDialog
        description={
          <>
            Please enter No. of token you wish to Create <br />
            <br />
            Your have total #NA tokens
          </>
        }
        cashBalance={0}
        handleClose={handleClose}
        open={assignTokenDialog}
      />

      <AmountForm
        title="Add Budget in Project"
        description={<>Please enter the budget you wish to add to project</>}
        approveCashTransfer={CashActions?.sendCashToProject}
        handleClose={hideDialog}
        open={isDialogShow}
        loadingKey={loadingKey}
      />

      <Grid item xs={12} md={12}>
        <Card variant="outlined">
          <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center">
            <Button variant="outlined" color="success" onClick={handleBeneficiaryRouteAction}>
              {' '}
              Beneficiary List{' '}
            </Button>
            <ActionMenu menuItems={menuItems} actionTitle="Actions" />
          </Stack>
        </Card>
      </Grid>
    </>
  );
};

export default TitleCard;
