import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useLoading from '@hooks/useLoading';
import LoadingOverlay from '@components/LoadingOverlay';
import { useSnackbar } from 'notistack';

AmountForm.propTypes = {
  approveCashTransfer: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  description: PropTypes.node,
  title: PropTypes.string,
};

export default function AmountForm({ approveCashTransfer, title, description, open, handleClose }) {
  const [amount, setAmount] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { loading, showLoading, hideLoading } = useLoading();

  const handleSendCash = async (e) => {
    showLoading('cashTransfer');
    await approveCashTransfer(amount);
    hideLoading('cashTransfer');
    enqueueSnackbar('Added Budget to Project');
    handleClose();
    setAmount('');
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <LoadingOverlay open={loading.cashTransfer}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Budget to add"
              type="number"
              fullWidth
              variant="outlined"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSendCash} disabled={amount === '' || amount < 1}>
              Add
            </Button>
          </DialogActions>
        </LoadingOverlay>
      </Dialog>
    </div>
  );
}
