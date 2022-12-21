import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useMobilizerContext } from '@contexts/mobilizers';
import truncateEthAddress from '@utils/truncateEthAddress';

const BasicInfoCard = (props) => {
  const { singleMobilizer } = useMobilizerContext();

  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="body1">{singleMobilizer?.name}</Typography>
        </Stack>

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{singleMobilizer?.phone}</Typography>
            <Typography variant="body2">Phone</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{truncateEthAddress(singleMobilizer?.wallet_address)}</Typography>
            <Typography variant="body2">Wallet Address</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

BasicInfoCard.propTypes = {};

export default BasicInfoCard;
