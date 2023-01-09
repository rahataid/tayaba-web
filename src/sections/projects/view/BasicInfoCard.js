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
  console.log(singleProject)
  return (
    <Stack mt={3}>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start">
          <Grid item xs={12} md={6}>
          <Typography variant="h6"  sx={{ fontWeight: 500 }} >Manager : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body3">
              {singleProject?.data?.projectManager}
            </Typography>
           </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="center" alignItems="flex-start">
          <Grid item xs={12} md={6}>
          <Typography variant="h6"  sx={{ fontWeight: 500 }} >Location : </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body3">
              {singleProject?.data?.location}
            </Typography>
           </Grid>
          </Grid>
          <Grid container direction="row"  alignItems="flex-start">
          <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>Start Date :</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body3" >
                {moment(singleProject?.data?.startDate).format('DD MMM, YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>End Date :</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body3" >
                {moment(singleProject?.data?.endDate).format('DD MMM, YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>Created At :</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body3" >
                {moment(singleProject?.data?.createdAt).format('DD MMM, YYYY')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" paddingTop={4}>
          {isRahatResponseLive ? (
            <Chip color="success" label="Response Activated" />
          ) : (
            <Chip variant="outlined" color="error" label="Response Not Triggered" />
          )}
          </Grid>
            
                    </Stack>

  );
}
