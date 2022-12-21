import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useMobilizerContext } from '@contexts/mobilizers';
import moment from 'moment';

const MoreInfoCard = (props) => {
  const { singleMobilizer } = useMobilizerContext();

  console.log('first', singleMobilizer);

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography sx={{ mb: 2 }} variant="h5">
          Profile Information
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {singleMobilizer?.email}
            </Typography>
            <Typography variant="body2">Email</Typography>
          </Grid>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {singleMobilizer?.phone}
            </Typography>
            <Typography variant="body2">Phone</Typography>
          </Grid>

          <Grid item xs={12} md={6} direction="column">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {singleMobilizer?.govt_id}
            </Typography>
            <Typography variant="body2">Government ID</Typography>
          </Grid>

          <Grid item xs={12} md={6} direction="column">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {singleMobilizer?.address}
            </Typography>
            <Typography variant="body2">Address</Typography>
          </Grid>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {singleMobilizer?.organization}
            </Typography>
            <Typography variant="body2">Organization</Typography>
          </Grid>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {moment(singleMobilizer?.registrationDate).format('DD/MM/YYYY')}
            </Typography>
            <Typography variant="body2">Registration Date</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
