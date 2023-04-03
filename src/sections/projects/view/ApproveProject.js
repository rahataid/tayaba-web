import LoadingOverlay from '@components/LoadingOverlay';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useProject } from '@services/contracts/useProject';
import { useState } from 'react';

export default function ApproveProject({ open, handleClose }) {
  const { approveProject } = useProject();
  const { handleContractError } = useErrorHandler();

  const [loading, setLoading] = useState(false);
  const handleApprove = async () => {
    try {
      await approveProject();
      handleClose();
    } catch (error) {
      console.log(error);
      handleClose();
      handleContractError(error);
    }
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
