import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import WalletExplorerButton from '@components/button/WalletExplorerButton';

TokenDetails.propTypes = {
  chainData: PropTypes.object,
};

export default function TokenDetails({ chainData, ethBalance }) {
  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="body1">Token Details</Typography>
        </Stack>

        {chainData?.cashAllowance > 0 && (
          <Alert sx={{ mt: 2 }}> This vendor have yet to accept ₹ {chainData?.cashAllowance}.</Alert>
        )}

        <Stack sx={{ pt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {chainData?.tokenBalance || 0}
            </Typography>
            <Typography variant="body2">Token Balance</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {chainData?.cashBalance || 0}
            </Typography>
            <Typography variant="body2">Cash Balance</Typography>
          </Grid>
        </Stack>
        <Stack sx={{ pt: 1 }} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <WalletExplorerButton address={chainData?.walletAddress} type="address" />

            <Typography variant="body2">Contract Address</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {ethBalance || 0}
            </Typography>

            <Typography variant="body2">Eth Balance</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
