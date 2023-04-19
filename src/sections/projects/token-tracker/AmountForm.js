import LoadingOverlay from '@components/LoadingOverlay';
import useLoading from '@hooks/useLoading';
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

export default function AmountForm({ transferToken, title, description, open, handleClose, loadingKey }) {
  const [amount, setAmount] = useState('');
  const { loading, showLoading, hideLoading } = useLoading();

  const handleSendCash = async (e) => {
    showLoading(loadingKey);
    await transferToken(amount);
    hideLoading(loadingKey);
    handleClose();
    setAmount('');
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <LoadingOverlay open={loading[loadingKey]}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>{description}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Relief items to add"
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
