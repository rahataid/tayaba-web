import LoadingOverlay from '@components/LoadingOverlay';
import { useProjectContext } from '@contexts/projects';
import useDialog from '@hooks/useDialog';
import { useErrorHandler } from '@hooks/useErrorHandler';
import useLoading from '@hooks/useLoading';
import { Button, Card, Dialog, DialogActions, DialogTitle, Grid, Stack } from '@mui/material';
import { PATH_PROJECTS } from '@routes/paths';
import { useProject } from '@services/contracts/useProject';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { ProjectService } from '@services/projects';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import AmountForm from '../token-tracker/AmountForm';
import ActionMenu from './ActionMenu';
import ApproveProject from './ApproveProject';

const TitleCard = ({ chainData, refreshData }) => {
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { roles, wallet } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingKey] = useState(null);
  const { throwError } = useErrorHandler();

  const { handleContractError } = useErrorHandler();
  const {
    push,
    query: { projectId },
  } = useRouter();

  const [modalData, setModalData] = useState({
    title: '',
    type: '',
  });
  const { lockProject, unLockProject } = useProject();
  const { singleProject } = useProjectContext();
  const [assignTokenDialog, setAssignTokenDialog] = useState(false);
  const { sendTokenToProject } = useRahatDonor();
  const { loading, showLoading, hideLoading } = useLoading();
  const [anchorEl, setAnchorEl] = useState(null);

  const [approveProjectDialog, setApproveProjectDialog] = useState(false);

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
      handleContractError(error);
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
      handleContractError(error);
    }
    hideDialog();
    refreshData();
    hideLoading('projectAction');
    handleMenuItemClose();
  };
  const handleClose = () => {
    setAssignTokenDialog(false);
    setApproveProjectDialog(false);
    handleMenuItemClose();
    hideDialog();
  };

  const handleAddBudgetModel = () => {
    setAssignTokenDialog((prev) => !prev);
  };

  const TokenActions = {
    sendTokenToProject: (amount) => () => {
      showLoading('project-view');
      sendTokenToProject(amount).then(() => {
        enqueueSnackbar('Tokens sent to Project', {
          variant: 'success',
        });
        refreshData();
        handleMenuItemClose();
        hideLoading('project-view');
        handleAddBudgetModel();
      });
    },
  };

  const handleBeneficiaryRouteAction = () => {
    push(`/projects/${projectId}/beneficiaries`);
  };

  const handleDelete = async () => {
    try {
      await ProjectService.delete(projectId);
      enqueueSnackbar('Project Deleted', {
        variant: 'success',
      });
      push(PATH_PROJECTS.root);
    } catch (error) {
      enqueueSnackbar('Error deleting project', {
        variant: 'error',
      });
      console.log(error);
    }
  };
  const handleApprove = () => {
    setApproveProjectDialog(true);

    return;
  };

  const menuItems = [
    {
      onClick: handleAddBudgetModel,
      name: 'Create Tokens',
      show: singleProject?.isApproved && roles?.isDonor,
    },
    {
      onClick: handleLockModal,
      name: 'Lock Project',
      show: singleProject?.isApproved && roles?.isDonor && chainData?.projectBalance > 0 && !chainData?.isLocked,
    },
    {
      onClick: handleUnlockModal,
      name: 'Unlock Project',
      show: singleProject?.isApproved && roles?.isDonor && chainData?.projectBalance > 0 && chainData?.isLocked,
    },
    {
      name: 'Edit',
      onClick: () => push(`/projects/edit/${projectId}`),
      show: singleProject?.isApproved && roles?.isDonor,
    },
    {
      name: 'Approve',
      onClick: handleApprove,
      show: !singleProject?.isApproved && roles?.isDonor,
    },
    {
      name: 'Delete',
      onClick: handleDelete,
      show: roles?.isDonor,
      sx: {
        color: 'red',
      },
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
        title="Add Tokens to Project"
        description={<>Please enter the amount of tokens you want to send to the project.</>}
        transferToken={TokenActions?.sendTokenToProject}
        handleClose={handleClose}
        open={assignTokenDialog}
        loadingKey={'project-view'}
      />
      <ApproveProject open={approveProjectDialog} handleClose={handleClose} handleMenuItemClose={handleMenuItemClose} />

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

TitleCard.propTypes = {
  chainData: PropTypes.object,
  refreshData: PropTypes.func,
};

export default TitleCard;
