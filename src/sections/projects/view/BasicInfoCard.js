import React from 'react';
import PropTypes from 'prop-types';
import {CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import moment from 'moment';

BasicInfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function BasicInfoCard({ rahatChainData}) {
  const { singleProject, isRahatResponseLive, beneficiaryCount } = useProjectContext();
  return (

      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
         
          {/* <Chip label="DEFAULT PROJECT" /> */}
        </Stack>

        <Stack sx={{ p: 0}} direction="row" justifyContent="space-between" alignItems="center" spacing={6}>
          {/* <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              {rahatChainData.totalBudget || 0}
            </Typography>
            <Typography variant="body2">Allocated Budget</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              {rahatChainData.tokenBalance || 0}
            </Typography>
            <Typography variant="body2">Remaining Balance</Typography>
          </Grid> */}
          
       
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
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          {isRahatResponseLive ? (
            <Chip color="success" label="Response Activated" />
          ) : (
            <Chip variant="outlined" color="error" label="Response Not Triggered" />
          )}
          </Grid>
        </Stack>
      </CardContent>
  );
}
