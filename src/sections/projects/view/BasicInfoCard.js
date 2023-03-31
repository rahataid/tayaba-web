import Iconify from '@components/iconify';
import LoadingOverlay from '@components/LoadingOverlay';
import { useProjectContext } from '@contexts/projects';
import useDialog from '@hooks/useDialog';
import useLoading from '@hooks/useLoading';
import { Button, Chip, Dialog, DialogActions, DialogTitle, Grid, Stack, Typography } from '@mui/material';
import { useProject } from '@services/contracts/useProject';
import moment from 'moment';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData, ...other }) {
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { singleProject, vendorCount, refreshData, editData } = useProjectContext();
  const router = useRouter();
  const [modalData, setModalData] = useState({
    title: '',
    type: '',
  });

  console.log(singleProject);
  const { loading, showLoading, hideLoading } = useLoading();

  const { lockProject, unLockProject } = useProject();

  const handleUnlockModal = () => {
    setModalData({ title: 'Are you sure to Unlock the project ?', type: 'Unlock' });
    showDialog();
  };

  const handleEditProject = () => {
    router.push(`/projects/edit/${router.query.projectId}`);
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
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-around" spacing={10}>

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
          <Typography variant="h5" sx={{ fontWeight: 400 }}>
            {singleProject?.data?.projectManager}
          </Typography>
          <Typography variant="body2">Managed By</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 400 }}>
            {vendorCount}
          </Typography>

          <Typography variant="body2">Distributor(s)</Typography>
        </Grid>
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 400 }}>
            {moment(singleProject?.data?.startDate).format('DD MMM YYYY')}
          </Typography>
          <Typography variant="caption">Start Date</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 400 }}>
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
