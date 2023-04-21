import LoadingOverlay from '@components/LoadingOverlay';
import { useProjectContext } from '@contexts/projects';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useProject } from '@services/contracts/useProject';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function ApproveProject({ open, handleClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const { approveProject } = useProject();
  const { approve, refreshData } = useProjectContext();
  const { handleContractError } = useErrorHandler();
  const {
    query: { projectId: contractAddress },
  } = useRouter();

  const [loading, setLoading] = useState(false);
  const handleApprove = async () => {
    setLoading(true);
    try {
      console.log('approving');
      await approveProject(contractAddress);
      await approve(contractAddress, { isApproved: true });
      refreshData();
      enqueueSnackbar('Approved  Project');
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
      handleContractError(error);
    }
    setLoading(false);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <LoadingOverlay open={loading}>
          <DialogTitle> Are you Sure to approve Project</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            <Button onClick={handleApprove} variant="outlined">
              Approve
            </Button>
          </DialogActions>
        </LoadingOverlay>
      </Dialog>
    </>
  );
}
