import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Typography, Chip } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import moment from 'moment';
import Iconify from '@components/iconify';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData, ...other }) {
  const { singleProject, vendorCount } = useProjectContext();
  return (
    <>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-end">
          {rahatChainData?.isLocked ? (
            <Chip
              label={`Locked `}
              variant="outlined"
              color="error"
              icon={<Iconify icon={'material-symbols:lock-outline'} />}
            />
          ) : (
            <Chip
              label={`Unlocked`}
              variant="outlined"
              color="success"
              icon={<Iconify icon={'material-symbols:lock-open-outline-rounded'} />}
            />
          )}
        </Grid>
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {'SRSO'}
          </Typography>
          <Typography variant="body2">Managed By</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {vendorCount}
          </Typography>

          <Typography variant="body2">Distributor(s)</Typography>
        </Grid>
      </Stack>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {moment(singleProject?.data?.startDate).format('DD MMM YYYY')}
          </Typography>
          <Typography variant="caption">Start Date</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {moment(singleProject?.data?.endDate).format('DD MMM YYYY')}
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
