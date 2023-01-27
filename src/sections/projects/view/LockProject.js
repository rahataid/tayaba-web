import LoadingOverlay from '@components/LoadingOverlay';
import useDialog from '@hooks/useDialog';
import { useErrorHandler } from '@hooks/useErrorHandler';
import useLoading from '@hooks/useLoading';
import { Button, Chip, Typography, Dialog, DialogActions, DialogTitle, Stack, Grid } from '@mui/material';
import { useProject } from '@services/contracts/useProject';
import React, { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
export default function LockProject({ chainData, refreshData }) {
  const { roles, wallet } = useAuthContext();
  const { lockProject, unLockProject } = useProject();
  const [modalData, setModalData] = useState({
    title: '',
    type: '',
  });
  const { throwError } = useErrorHandler();
  const { loading, showLoading, hideLoading } = useLoading();
  const { hideDialog, showDialog, isDialogShow } = useDialog();
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
      console.log(error);
      hideLoading('projectAction');
      hideDialog();
      throwError('cannot lock Project');
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
  return (
    <React.Fragment>
      <Dialog open={isDialogShow} onClose={hideDialog}>
        <LoadingOverlay open={loading.projectAction}>
          <DialogTitle>{modalData.title}</DialogTitle>
          <DialogActions>
            {modalData?.type === 'Lock' ? (
              <Button onClick={handleLockProject}> YES</Button>
            ) : (
              <Button onClick={handleUnlockProject}> YES</Button>
            )}
            <Button onClick={hideDialog}> NO</Button>
          </DialogActions>
        </LoadingOverlay>
      </Dialog>
      {roles?.isDonor && (
        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          {chainData?.projectBalance > 0 ? (
            <React.Fragment>
              {chainData?.isLocked ? (
                <>
                  <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                    <Chip label="Project Is Locked" variant="outlined" color="success" />
                  </Grid>
                  <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                    <Button type="outlined" onClick={handleUnlockModal}>
                      Unlock
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                    <Chip label="Project Is Unlocked" variant="outlined" color="error" />
                  </Grid>
                  <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                    <Button type="outlined" onClick={handleLockModal}>
                      Lock
                    </Button>
                  </Grid>
                </>
              )}
            </React.Fragment>
          ) : (
            <Chip label="Add Budget To Take Project Actions" variant="outlined" color="info" />
          )}
        </Stack>
      )}
    </React.Fragment>
  );
}
