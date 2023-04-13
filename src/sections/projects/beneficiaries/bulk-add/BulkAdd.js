import Iconify from '@components/iconify';
import { useProjectContext } from '@contexts/projects';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const activationCode = {
  activating: 'Activating',
  activated: 'Activated',
  assigning: 'Assigning',
  assigned: 'Assigned',
};

const BulkAdd = ({ selectedBeneficiaries }) => {
  const { handleError } = useErrorHandler();
  const { getBeneficiariesByProject, singleProject, bulkAddBeneficiary, getProjectByAddress } = useProjectContext();

  const [activationStatus, setActivationStatus] = useState('');

  const [openDialog, setOpenDialog] = useState(false);

  const {
    query: { projectId: contractAddress },
  } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!selectedBeneficiaries.length) return;
    getBeneficiariesByProject({});
  }, [selectedBeneficiaries, openDialog]);

  const handleDialog = () => {
    if (!selectedBeneficiaries.length) {
      alert('Please select beneficiaries to assign tokens to.');
      return;
    }

    setActivationStatus('');
    setOpenDialog((prev) => !prev);
  };

  const handleBulkAssign = async () => {
    try {
      if (!selectedBeneficiaries.length) {
        alert('Please select beneficiaries to add ');
        return;
      }
      if (!singleProject?.id) return;

      await bulkAddBeneficiary({ beneficiariesId: selectedBeneficiaries, projectId: singleProject.id });
      enqueueSnackbar('Added Beneficiary');

      setOpenDialog((prev) => !prev);
    } catch (error) {
      handleError(error);

      console.log('error', error);
    }

    // setOpenDialog(false);
  };
  useEffect(() => {
    if (!contractAddress) return;
    getProjectByAddress(contractAddress);
  }, [contractAddress]);

  let buttonLoading = activationStatus === activationCode.activating || activationStatus === activationCode.assigning;

  return (
    <Box>
      <Button onClick={handleDialog}>Bulk Add</Button>
      <Dialog open={openDialog} onClose={handleDialog}>
        <DialogTitle>
          <Typography variant={'h4'}>Bulk add Beneficiaries</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>Are You sure To add selected Beneficiaries to this Project?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <LoadingButton
            loading={buttonLoading}
            loadingPosition="start"
            startIcon={buttonLoading && <Iconify icon="eos-icons:loading" />}
            disabled={buttonLoading || selectedBeneficiaries.length < 1}
            variant="outlined"
            onClick={handleBulkAssign}
          >
            Add To Project
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

BulkAdd.propTypes = {};

export default BulkAdd;
