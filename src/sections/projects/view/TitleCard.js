import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography, Dialog, DialogTitle, DialogActions, Button, Alert } from '@mui/material';
import ActionMenu from './ActionMenu';
import CreateTokenDialog from '../cash-tracker/CreateTokenDialog';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import AmountForm from '../cash-tracker/AmountForm';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'notistack';
import useLoading from '@hooks/useLoading';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useProject } from '@services/contracts/useProject';

const TitleCard = ({ chainData, refreshData }) => {
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { roles, wallet } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingKey, setLoadingKey] = useState(null);
  const { throwError } = useErrorHandler();

  const {
    push,
    query: { projectId },
  } = useRouter();
  const [modalData, setModalData] = useState({
    title: '',
    type: '',
  });
  const { lockProject, unLockProject } = useProject();
  const [assignTokenDialog, setAssignTokenDialog] = useState(false);
  const { sendCashToProject } = useRahatDonor();
  const { loading, showLoading, hideLoading } = useLoading();
  const handleUnlockModal = () => {
    setModalData({ title: 'Are You Sure To Unlock  ?', type: 'Unlock' });
    showDialog();
  };
  const handleLockModal = () => {
    setModalData({ title: 'Are You Sure To Lock Project ?', type: 'Lock' });
    showDialog();
  };
  const handleLockProject = async () => {
    showLoading('projectAction');
    try {
      await lockProject(wallet.address);
    } catch (error) {
      console.log({ error });
      hideLoading('projectAction');
      hideDialog();
    }
    hideDialog();
    refreshData();
    hideLoading('projectAction');
  };

  const handleUnlockProject = async () => {
    showLoading('projectAction');
    try {
      await unLockProject(wallet.address);
    } catch (error) {
      hideLoading('projectAction');
      hideDialog();
      throwError('cannot unlock Project');
    }
    hideDialog();
    refreshData();
    hideLoading('projectAction');
  };
  const handleClose = () => {
    setAssignTokenDialog(false);
    hideDialog();
  };

  const handleAddBudgetModel = () => {
    setAssignTokenDialog((prev) => !prev);
  };

  const CashActions = {
    async sendCashToProject(amount) {
      await sendCashToProject(amount);
      setLoadingKey('cashTransfer');
      enqueueSnackbar('Added Relief items to Project');
    },
  };

  const handleBeneficiaryRouteAction = () => {
    push(`/projects/${projectId}/beneficiaries`);
  };

  const menuItems = [
    {
      onClick: handleAddBudgetModel,
      name: 'Create H20Wheel Tokens',
      show: roles?.isDonor,
    },
    {
      onClick: handleLockModal,
      name: 'Lock Project',
      show: roles?.isDonor && chainData?.projectBalance > 0 && !chainData?.isLocked,
    },
    {
      onClick: handleUnlockModal,
      name: 'Unlock Project',
      show: roles?.isDonor && chainData?.projectBalance > 0 && chainData?.isLocked,
    },
  ];

  return (
    <>
      <Dialog open={isDialogShow} onClose={hideDialog}>
        {/* <LoadingOverlay open={loading.projectAction}> */}
        <DialogTitle>{modalData.title}</DialogTitle>
        <DialogActions>
          {modalData?.type === 'Lock' ? (
            <Button onClick={handleLockProject}> YES</Button>
          ) : (
            <Button onClick={handleUnlockProject}> YES</Button>
          )}
          <Button onClick={hideDialog}> NO</Button>
        </DialogActions>
        {/* </LoadingOverlay> */}
      </Dialog>
      <AmountForm
        title="Add Relief Items in Project"
        description={<>Please enter the Relief items you wish to add to project</>}
        approveCashTransfer={CashActions?.sendCashToProject}
        handleClose={handleClose}
        open={assignTokenDialog}
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
