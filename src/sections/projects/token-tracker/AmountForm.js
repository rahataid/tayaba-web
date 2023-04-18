import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useState } from 'react';

AmountForm.propTypes = {
  transferToken: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  description: PropTypes.node,
  title: PropTypes.string,
  loadingKey: PropTypes.string,
};

export default function AmountForm({
  transferToken = (amount) => () => {
    console.log(amount + 'not implemented');
  },
  title,
  description,
  open,
  handleClose,
  loadingKey,
}) {
  const [amount, setAmount] = useState('');

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Number of tokens to add"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={transferToken(amount)} disabled={amount === '' || amount < 1}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
