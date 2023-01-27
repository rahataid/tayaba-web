import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import useDialog from '@hooks/useDialog';
import ReleaseCashButton from './ReleaseCashButton';

TokenDetails.propTypes = {
  chainData: PropTypes.object,
};

export default function TokenDetails({ chainData, ethBalance }) {
  const { isDialogShow, showDialog, hideDialog } = useDialog();

  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="body1">H20 Wheels Details</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <ReleaseCashButton />
          </Grid>
        </Stack>

        {chainData?.cashAllowance > 0 && (
          <Alert sx={{ mt: 2 }} type="info">
            {' '}
            This vendor have yet to accept {chainData?.cashAllowance}.
          </Alert>
        )}

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              {chainData?.allowance || 0}
            </Typography>
            <small>Total H20 Wheels Disbursed</small>
            <Typography variant="h5" sx={{ fontWeight: 200 }}>
              {chainData?.cashAllowance || 0}
            </Typography>
            <small>Pending Acceptance by Village Representative</small>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
