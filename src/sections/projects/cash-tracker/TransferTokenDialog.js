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

export default function TransferTokenDialog({ approveTransferToken,  description, open, handleClose }) {
  const [token, setToken] = useState('');
  const handleTransferToken = async (e) => {
    handleClose();
    await approveTransferToken(token);
    setToken('');
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
            onChange={(e) => setToken(e.target.value)}
            value={token}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleTransferToken} disabled={token === '' || token < 1}>
           Transfer Token
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
