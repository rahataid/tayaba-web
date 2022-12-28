import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import moment from 'moment';

const MoreInfoCard = (props) => {
  const { singleProject } = useProjectContext();
  console.log({ singleProject })
  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {singleProject?.data?.name}
            </Typography>
            <Typography variant="body2">Project Name </Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {moment(singleProject?.projectCreatedAt).format('DD MMM, YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2">Created At</Typography>
            </Grid>
          </Grid>
        </Stack>
        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {singleProject?.data?.location}
            </Typography>
            <Typography variant="body2">Location</Typography>
          </Grid>
        </Stack>

        <Stack sx={{ p: 2 }}>
          <Typography variant="body1">H20 Wheels Distribution</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
