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
        {rahatChainData?.isLocked && <Chip label=" Locked" variant="outlined" color="error" />}
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {'Srso'}
          </Typography>
          <Typography variant="body2">Project Manager</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {singleProject?.data?.vendor_details.length}
          </Typography>

          <Typography variant="body2">No. Of Vendors</Typography>
        </Grid>
      </Stack>
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
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Typography variant="body1"> {singleProject?.data?.description}</Typography>
      </Stack>
    </>
  );
}
