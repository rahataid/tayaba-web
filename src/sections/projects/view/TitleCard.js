import React, { useState } from 'react';
import { Card, Grid, Stack, Typography, Dialog, DialogTitle, DialogActions, Button, Alert } from '@mui/material';
import ActionMenu from './ActionMenu';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import AmountForm from '../token-tracker/AmountForm';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'notistack';
import useLoading from '@hooks/useLoading';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useProject } from '@services/contracts/useProject';
import LoadingOverlay from '@components/LoadingOverlay';
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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuItemClose = () => {
    setAnchorEl(null);
  };

  const handleUnlockModal = () => {
    setModalData({ title: 'Are you sure to Unlock the project ?', type: 'Unlock' });
    showDialog();
  };
  const handleLockModal = () => {
    setModalData({ title: 'Are you sure to Lock the project ?', type: 'Lock' });
    showDialog();
  };
  const handleLockProject = async () => {
    showLoading('projectAction');
    try {
      await lockProject(wallet.address);
    } catch (error) {
      console.log({ error });
    }
    hideDialog();
    refreshData();
    hideLoading('projectAction');
    handleMenuItemClose();
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
    handleMenuItemClose();
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
      showLoading('project-view');
      await sendCashToProject(amount);
      hideLoading('project-view');
      enqueueSnackbar('Added Budget to Project');
      handleMenuItemClose();
    },
  };

  const handleBeneficiaryRouteAction = () => {
    push(`/projects/${projectId}/beneficiaries`);
  };

  const menuItems = [
    {
      onClick: handleAddBudgetModel,
      name: 'Create H2OWheel Tokens',
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
        <LoadingOverlay open={loading.projectAction}>
          <DialogTitle>{modalData.title}</DialogTitle>
          <DialogActions>
            <Button onClick={hideDialog}>Cancel</Button>
            {modalData?.type === 'Lock' ? (
              <Button onClick={handleLockProject} variant="outlined">
                Lock
              </Button>
            ) : (
              <Button onClick={handleUnlockProject} variant="outlined">
                Unlock
              </Button>
            )}
          </DialogActions>
        </LoadingOverlay>
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
            {roles?.isDonor && (
              <ActionMenu
                menuItems={menuItems}
                actionTitle="Actions"
                handleClose={handleMenuItemClose}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
              />
            )}
          </Stack>
        </Card>
      </Grid>
    </>
  );
};

export default TitleCard;
