/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { useRahat } from '@services/contracts/useRahat';
import WalletExplorerButton from '@components/button/WalletExplorerButton';
import { SPACING } from '@config';

TokenDetails.propTypes = {};
export default function TokenDetails() {
  const { chainData } = useBeneficiaryContext();
  //const { beneficiaryBalance, beneficiaryData, contract } = useRahat();

  return (
    <Card sx={{ width: '100%', mb: SPACING.GRID_SPACING }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="body1">Benefits Details</Typography>
        </Stack>

        <Stack
          sx={{ pt: SPACING.GRID_SPACING }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.tokenBalance || 0}</Typography>
            <Typography variant="body2">Remaining Claim</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.cashBalance || 0}</Typography>
            <Typography variant="body2">Cash Received</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.totalTokenIssued || 0}</Typography>
            <Typography variant="body2">Total Claim</Typography>
          </Grid>
        </Stack>
        <Stack
          sx={{ pt: SPACING.GRID_SPACING }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <WalletExplorerButton variant="h4" address={chainData?.walletAddress} type="address" />
            <Typography variant="body2">Wallet Address</Typography>
          </Grid>
          {/* <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.totalTokenIssued || 0}</Typography>
            <Typography variant="body2">Eth Balance</Typography>
          </Grid> */}
        </Stack>
      </CardContent>
    </Card>
  );
}
