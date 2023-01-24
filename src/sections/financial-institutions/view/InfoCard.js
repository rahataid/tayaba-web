import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { SPACING } from '@config';

const InfoCard = ({ info, ...props }) => {
  return (
    <Grid container spacing={SPACING.GRID_SPACING}>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardHeader title={info?.name} />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              Name
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardHeader title={info?.address} />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              Head Office Address
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card>
          <CardHeader title={info?.phone} />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              Phone
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

InfoCard.propTypes = {
  info: PropTypes.object,
};

export default InfoCard;
