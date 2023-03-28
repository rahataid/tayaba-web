import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Chip, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import moment from 'moment';
import Iconify from '@components/iconify';
import useDialog from '@hooks/useDialog';

import { useProject } from '@services/contracts/useProject';
import LoadingOverlay from '@components/LoadingOverlay';
import useLoading from '@hooks/useLoading';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData, ...other }) {
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { singleProject, vendorCount, refreshData } = useProjectContext();
  console.log(singleProject);
  const [modalData, setModalData] = useState({
    title: '',
    type: '',
  });

  const { loading, showLoading, hideLoading } = useLoading();

  const { lockProject, unLockProject } = useProject();

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
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-end">
          {rahatChainData?.isLocked ? (
            <Chip
              label={`Locked `}
              variant="outlined"
              color="error"
              icon={<Iconify icon={'material-symbols:lock-outline'} />}
              onClick={handleUnlockModal}
            />
          ) : (
            <Chip
              label={`Unlocked`}
              variant="outlined"
              color="success"
              onClick={handleLockModal}
              icon={<Iconify icon={'material-symbols:lock-open-outline-rounded'} />}
            />
          )}
        </Grid>
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {singleProject?.data?.projectManager}
          </Typography>
          <Typography variant="body2">Managed By</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {vendorCount}
          </Typography>

          <Typography variant="body2">Distributor(s)</Typography>
        </Grid>
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {moment(singleProject?.data?.startDate).format('DD MMM YYYY')}
          </Typography>
          <Typography variant="caption">Start Date</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {moment(singleProject?.data?.endDate).format('DD MMM YYYY')}
          </Typography>
          <Typography variant="caption">End Date</Typography>
        </Grid>
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Typography variant="body1"> {singleProject?.data?.description}</Typography>
      </Stack>
    </>
  );
}
