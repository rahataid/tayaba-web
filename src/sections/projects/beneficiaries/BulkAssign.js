import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Stack,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { NUMBER_OF_TOKEN_TO_ASSIGN_TO_BENEFICIARY } from '@config';
import { useProject } from '@services/contracts/useProject';
import Iconify from '@components/iconify';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { BeneficiaryService } from '@services/beneficiaries';

const activationCode = {
  activating: 'Activating',
  activated: 'Activated',
  assigning: 'Assigning',
  assigned: 'Assigned',
};

const BulkAssign = ({ selectedBeneficiaries }) => {
  const { bulkActivateBeneficiaries, bulkAssignBeneficiaries } = useProject();
  const { handleError } = useErrorHandler();
  const { getBeneficiariesByProject, beneficiaries } = useProjectContext();

  const {
    query: { projectId },
  } = useRouter();

  const [activationStatus, setActivationStatus] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [numberOfTokens, setNumberOfTokens] = useState(NUMBER_OF_TOKEN_TO_ASSIGN_TO_BENEFICIARY);

  const assignedBeneficiaries = beneficiaries?.data?.filter((beneficiary) => beneficiary?.tokensAssigned > 0);

  const unassignedSelectedBeneficiaries = selectedBeneficiaries.filter(
    (address) => !assignedBeneficiaries.find((beneficiary) => beneficiary.walletAddress === address)
  );

  useEffect(() => {
    if (!selectedBeneficiaries.length) return;
    getBeneficiariesByProject({
      projectId,
    });
  }, [selectedBeneficiaries, projectId, openDialog]);

  const handleDialog = () => {
    if (!selectedBeneficiaries.length) {
      alert('Please select beneficiaries to assign tokens to.');
      return;
    }

    setActivationStatus('');
    setOpenDialog((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNumberOfTokens(value);
  };

  const handleBulkAssign = async () => {
    try {
      setActivationStatus(activationCode.activating);

      if (!selectedBeneficiaries.length) {
        alert('Please select beneficiaries to assign tokens to.');
        return;
      }

      const activated = await bulkActivateBeneficiaries(unassignedSelectedBeneficiaries);

      if (activated.status) {
        // const activatedAddresses = activated.logs.map((log) => log.address);
        // const updateActiveStatus = selectedBeneficiaries.map(async (address) => {
        //   const update = await BeneficiaryService.updateUsingWalletAddress(address, { isActivated: true });
        //   return update;
        // });

        // await Promise.all(updateActiveStatus);

        setActivationStatus(activationCode.assigning);

        const assigned = await bulkAssignBeneficiaries(unassignedSelectedBeneficiaries, numberOfTokens);
        if (assigned.status) {
          // const updateAssignedStatus = selectedBeneficiaries.map(async (address) => {
          //   const update = await BeneficiaryService.updateUsingWalletAddress(address, {
          //     tokensAssigned: numberOfTokens,
          //   });
          //   return update;
          // });

          // await Promise.all(updateAssignedStatus);

          setActivationStatus(activationCode.assigned);
          setOpenDialog(false);
        } else {
          setActivationStatus(activationCode.activated);
        }
      } else {
        setActivationStatus('');
      }
    } catch (error) {
      handleError(error);
      setActivationStatus('');

      console.log('error', error);
    }

    // setOpenDialog(false);
  };

  let buttonLoading = activationStatus === activationCode.activating || activationStatus === activationCode.assigning;

  return (
    <Box>
      <Button onClick={handleDialog}>Bulk Assign</Button>
      <Dialog open={openDialog} onClose={handleDialog}>
        <DialogTitle>
          <Typography variant={'h4'}>Bulk Assign Tokens</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              You are about to assign tokens to beneficiaries in this project. This action cannot be undone.
            </Typography>

            <Stack p={2}>
              <Alert severity="warning">
                <Typography>
                  Please make sure you have enough tokens in your wallet to assign to beneficiaries.
                </Typography>
              </Alert>
              {/* <Alert severity="info"> */}

              {/* </Alert> */}
            </Stack>

            <Stack p={2}>
              <TextField
                onChange={handleInputChange}
                disabled
                fullWidth
                label={'Number of tokens to assign each beneficiaries.'}
                value={numberOfTokens}
              />
              <Typography variant="caption" mt={2}>
                Selected beneficiaries:<strong> {selectedBeneficiaries.length}</strong>, out of which{' '}
                <strong> {assignedBeneficiaries?.length}</strong> are already assigned. So{' '}
                <strong> {unassignedSelectedBeneficiaries.length}</strong> beneficiaries will be assigned with{' '}
                <strong>{numberOfTokens}</strong> tokens each. | Total tokens to be assigned:{' '}
                <strong>{unassignedSelectedBeneficiaries.length * numberOfTokens}</strong>
              </Typography>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <LoadingButton
            loading={buttonLoading}
            loadingPosition="start"
            startIcon={buttonLoading && <Iconify icon="eos-icons:loading" />}
            disabled={
              buttonLoading || activationStatus === activationCode.assigned || !unassignedSelectedBeneficiaries.length
            }
            variant="outlined"
            onClick={handleBulkAssign}
          >
            {!activationStatus ? 'Assign' : activationStatus}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

BulkAssign.propTypes = {};

export default BulkAssign;
