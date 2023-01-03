import React from 'react';
import PropTypes from 'prop-types';
import {  CardContent, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';

const MoreInfoCard = (props) => {
  return (
      <CardContent>
        {/* <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {moment(singleProject?.data?.projectCreatedAt).format('DD MMM, YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2">Created At</Typography>
            </Grid>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              {singleProject?.data?.location}
            </Typography>
            <Typography variant="body2">Location</Typography>
          </Grid>
        </Stack> */}

        <Stack sx={{ p: 0 }}>
          <Typography variant="body1">H20 Wheels Distribution</Typography>
        </Stack>
      </CardContent>
  );
};

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
