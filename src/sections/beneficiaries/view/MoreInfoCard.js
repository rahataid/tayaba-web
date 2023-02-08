import React from 'react';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';

const MoreInfoCard = () => {
  const { singleBeneficiary } = useBeneficiaryContext();

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="h5">More Information</Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
              <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.data?.village_details?.taluka}</Typography>
                <Typography variant="body2">Taluka</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.data?.village_details?.name}</Typography>
                <Typography variant="body2">Village</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.data?.phoneOwnerRelation}</Typography>
                <Typography variant="body2">Phone Owner Relation</Typography>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.data?.phoneType}</Typography>
                  <Typography variant="body2">Phone Type</Typography>
                </Grid>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.data?.phoneOwnedBy}</Typography>
                <Typography variant="body2">Phone Owner</Typography>
              </Grid>

              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.data?.simRegisteredUnder}</Typography>
                  <Typography variant="body2">SIM Owner</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.data?.bankAccountType}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Bank Type</Typography>
                </Grid>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.data?.bankAccount}</Typography>
                <Typography variant="body2">Bank Account</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.data?.unionCouncil}</Typography>
                <Typography variant="body2">Union Council</Typography>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
