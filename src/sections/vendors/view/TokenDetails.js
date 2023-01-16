import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Card, CardContent, Grid, Stack, Typography, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import WalletExplorerButton from '@components/button/WalletExplorerButton';
import useDialog from '@hooks/useDialog';

TokenDetails.propTypes = {
  chainData: PropTypes.object,
};

export default function TokenDetails({ chainData, ethBalance }) {
  const { isDialogShow, showDialog, hideDialog } = useDialog();

  const handleAssignClaim = () => {
    showDialog();
  };

  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <Dialog open={isDialogShow} onClose={hideDialog}>
        <DialogTitle> Are you sure you to send H20 Wheels ?</DialogTitle>
        <DialogActions>
          <Button onClick={hideDialog}> YES</Button>
          <Button onClick={hideDialog}> NO</Button>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="body1">H20 Wheels Details</Typography>
        </Stack>

        {chainData?.cashAllowance > 0 && (
          <Alert sx={{ mt: 2 }}> This vendor have yet to accept ₹ {chainData?.cashAllowance}.</Alert>
        )}

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                   85
                </Typography>
                <small>Total H20 Wheels Disbursed</small> 
                <Typography variant="h5" sx={{ fontWeight: 200 }}>
                  10
                </Typography>
                <small>Pending Acceptance by Village Representative</small>
                <Button sx={{ mt: 2 }} size="small" variant="outlined" onClick={handleAssignClaim}>
                Send H20 Wheels
                </Button>
              </Grid>
            </Stack>
      </CardContent>
    </Card>
  );
}
