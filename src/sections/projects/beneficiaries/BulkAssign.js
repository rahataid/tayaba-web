import React, { useState } from 'react';
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
} from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { NUMBER_OF_TOKEN_TO_ASSIGN_TO_BENEFICIARY } from '@config';

const BulkAssign = () => {
  const { bulkAssignBeneficiaries } = useProjectContext();

  const [openDialog, setOpenDialog] = useState(false);
  const [numberOfTokens, setNumberOfTokens] = useState(NUMBER_OF_TOKEN_TO_ASSIGN_TO_BENEFICIARY);

  const {
    query: { projectId },
  } = useRouter();

  const handleDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNumberOfTokens(value);
  };

  const handleBulkAssign = async () => {
    await bulkAssignBeneficiaries(projectId, numberOfTokens);

    // setOpenDialog(false);
  };

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
              <TextField
                onChange={handleInputChange}
                fullWidth
                label={'Number of tokens to assign each beneficiaries.'}
                value={numberOfTokens}
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog}>Cancel</Button>
          <Button variant="outlined" onClick={handleBulkAssign}>
            Bulk Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

BulkAssign.propTypes = {};

export default BulkAssign;
