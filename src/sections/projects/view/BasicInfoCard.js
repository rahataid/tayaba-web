import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import moment from 'moment';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData, ...other }) {
  const { singleProject } = useProjectContext();
  return (
    <>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {moment(singleProject?.data?.startDate).format('DD MMM, YYYY')}
          </Typography>
          <Typography variant="caption">Start Date</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {moment(singleProject?.data?.endDate).format('DD MMM, YYYY')}
          </Typography>
          <Typography variant="caption">End Date</Typography>
        </Grid>
      </Stack>
    </>
  );
}
