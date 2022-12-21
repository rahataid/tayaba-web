import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useVendorsContext } from '@contexts/vendors';
import moment from 'moment';

const MoreInfoCard = (props) => {
  const { singleVendor } = useVendorsContext();

  return (
    <Card>
      <CardContent>
        <Typography sx={{ mb: 2 }} variant="h5">
          Profile Information
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {singleVendor?.shopName}
            </Typography>
            <Typography variant="body2">Shop Name</Typography>
          </Grid>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {singleVendor?.gender}
            </Typography>
            <Typography variant="body2">Gender</Typography>
          </Grid>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {singleVendor?.phone}
            </Typography>
            <Typography variant="body2">Phone</Typography>
          </Grid>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {singleVendor?.email}
            </Typography>
            <Typography variant="body2">Email</Typography>
          </Grid>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {singleVendor?.pan}
            </Typography>
            <Typography variant="body2">PAN</Typography>
          </Grid>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {singleVendor?.address}
            </Typography>
            <Typography variant="body2">Address</Typography>
          </Grid>
          <Grid item xs={12} md={6} direction="column">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {moment(singleVendor?.registrationDate).format('DD/MM/YYYY')}
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
