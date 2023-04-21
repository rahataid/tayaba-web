import Iconify from '@components/iconify';
import LoadingOverlay from '@components/LoadingOverlay';
import { useProjectContext } from '@contexts/projects';
import useDialog from '@hooks/useDialog';
import { useErrorHandler } from '@hooks/useErrorHandler';
import useLoading from '@hooks/useLoading';
import { Button, Chip, Dialog, DialogActions, DialogTitle, Grid, Stack, Typography } from '@mui/material';
import { useProject } from '@services/contracts/useProject';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData }) {
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { singleProject, vendorCount, refreshData } = useProjectContext();
  // const router = useRouter();
  const { lockProject, unLockProject } = useProject();
  const { throwError } = useErrorHandler();

  const { loading, showLoading, hideLoading } = useLoading();

  const [modalData, setModalData] = useState({
    title: '',
    type: '',
  });

  const handleUnlockModal = () => {
    setModalData({ title: 'Are you sure to Unlock the project ?', type: 'Unlock' });
    showDialog();
  };

  const handleLockProject = async () => {
    showLoading('projectAction');
    try {
      await lockProject(singleProject?.contractAddress);
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
      await unLockProject(singleProject?.contractAddress);
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
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" spacing={2}>
        {singleProject?.isApproved &&
          (rahatChainData?.isLocked ? (
            <Chip
              label={`Locked `}
              icon={<Iconify icon={'material-symbols:lock-outline'} />}
              onClick={handleUnlockModal}
            />
          ) : (
            <Chip
              label={`Unlocked`}
              color="success"
              icon={<Iconify icon={'material-symbols:lock-open-outline-rounded'} />}
            />
          ))}
        {/* <Chip
          label={singleProject?.status}
          color={singleProject?.isApproved ? 'success' : 'warning'}
          icon={<Iconify icon={'material-symbols:lock-outline'} />}
        /> */}
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={6}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 400 }}>
            {singleProject?.projectManager}
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
            {moment(singleProject?.startDate).format('DD MMM YYYY')}
          </Typography>
          <Typography variant="caption">Start Date</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 400 }}>
            {moment(singleProject?.endDate).format('DD MMM YYYY')}
          </Typography>
          <Typography variant="caption">End Date</Typography>
        </Grid>
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
        {
          singleProject?.extras && Object.entries(singleProject?.extras).map(([key, value]) =>
            <Grid key={`${key}`} container direction="column" justifyContent="flex-end" alignItems="flex-start">
              <Typography variant="body1"> {value}</Typography>
              <Typography variant="caption"> {key}</Typography>
            </Grid>
          )
        }
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Typography variant="body1"> {singleProject?.description}</Typography>
      </Stack>

    </>
  );
}
