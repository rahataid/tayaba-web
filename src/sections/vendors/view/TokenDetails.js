import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import SendToken from './SendToken';

TokenDetails.propTypes = {
  chainData: PropTypes.object,
};

export default function TokenDetails({ chainData }) {
  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="body1">H20 Wheels Details</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <SendToken />
          </Grid>
        </Stack>

        {chainData?.cashAllowance > 0 && (
          <Alert sx={{ mt: 2 }} type="info">
            {' '}
            This distributor has yet to accept {chainData?.cashAllowance}.
          </Alert>
        )}
        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{chainData?.allowance}</Typography>
            <Typography variant="body2">Balance</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{chainData?.cashAllowance || 0}</Typography>
            <Typography variant="body2">Pending</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{chainData?.vendorBalance || 0}</Typography>
            <Typography variant="body2">Disbursed</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
