import React from 'react';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import moment from 'moment';
import OppositeContentTimeline from '@components/Timeline';

const MoreInfoCard = () => {
  const { singleBeneficiary } = useBeneficiaryContext();
  const timelineData = [
    {event : "OTP", date : "Fri Jan 06 2023 10:54:59" },
    {event : "Beneficiary Claim", date : "Fri Jan 06 2023 12:00:00"},
    {event : "Token Sent", date : "Sun Jun 08 2023 1:25:00"},
  ]

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="h5">More Information</Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6}>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.data?.address?.village},{singleBeneficiary?.data?.address?.district}</Typography>
                <Typography variant="body2">Address</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.data?.phoneType}</Typography>
                  <Typography variant="body2">Phone Type</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.data?.phone}</Typography>
                <Typography variant="body2">Phone</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.data?.email}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Email</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.data?.bankAccount}</Typography>
                <Typography variant="body2">Bank Account</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <Typography variant="body1">{singleBeneficiary?.data?.unionCouncil}</Typography>
                  <Typography variant="body2">Union Council</Typography>
                </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.govtIdType}</Typography>
                <Typography variant="body2">Government Id Type</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.data?.cnicNumber}</Typography>
                  <Typography variant="body2">Government ID</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
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
                <Typography variant="body1">{singleBeneficiary?.data?.dailyWaterConsumption}</Typography>
                <Typography variant="body2">Daily Water Consumption</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.data?.dailyDistanceCovered}</Typography>
                  <Typography variant="body2">Daily Distance Covered</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={6} alignContent="flex-end">
          <OppositeContentTimeline timelineData={timelineData}/>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Bank Details</Typography>
          <Grid container>
            <Grid item xs={12} md={12} lg={12}>
              <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <Typography variant="body1">{singleBeneficiary?.bankName}</Typography>
                  <Typography variant="body2">Bank</Typography>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <Grid item xs={12} md={12}>
                    <Typography variant="body1">{singleBeneficiary?.bankAccountName}</Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="body2">Bank Account Name</Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <Typography variant="body1">{singleBeneficiary?.bankSwiftCode}</Typography>
                  <Typography variant="body2">Swift Code</Typography>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                  <Grid item xs={12} md={12}>
                    <Typography variant="body1">{singleBeneficiary?.data?.bankAccount}</Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="body2">Bank Account Number</Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
