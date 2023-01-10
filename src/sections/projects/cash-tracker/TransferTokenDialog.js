import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

TransferTokenDialog.propTypes = {
  approveCashTransfer: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  description: PropTypes.node,
  title: PropTypes.string,
};

export default function TransferTokenDialog({ approveCashTransfer, title, description, open, handleClose }) {
  const [amount, setAmount] = useState('');
  const handleSendCash = async (e) => {
    handleClose();
    await approveCashTransfer(amount);
    setAmount('');
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Transfer Token</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Transfer Token"
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
           Transfer Token
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
