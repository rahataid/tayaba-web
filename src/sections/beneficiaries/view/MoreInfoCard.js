import React from 'react';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import moment from 'moment';

const MoreInfoCard = () => {
  const { singleBeneficiary } = useBeneficiaryContext();
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
                <Typography variant="body1">{singleBeneficiary?.address}</Typography>
                <Typography variant="body2">Address</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.ward}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Ward</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.phone}</Typography>
                <Typography variant="body2">Phone</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.email}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Email</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{moment(singleBeneficiary?.dob).fromNow(true)}</Typography>
                <Typography variant="body2">Age</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{'40+'}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Category</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.govtIdType}</Typography>
                <Typography variant="body2">Government Id Type</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.govtId}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Government ID</Typography>
                </Grid>
              </Grid>
            </Stack>
            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Typography variant="body1">{singleBeneficiary?.education}</Typography>
                <Typography variant="body2">Education</Typography>
              </Grid>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{singleBeneficiary?.profession}</Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2">Profession</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={6} alignContent="flex-end">
            <Box component="img" alt={'empty'} src={`/assets/illustrations/id-icon.png`} />
            <Grid container direction="column" justifyContent="flex-start" alignItems="center" sx={{ mt: 1 }}>
              <Typography variant="body1">
                {moment(singleBeneficiary?.registrationDate).format('MMMM Do YYYY, h:mm:ss a')}
              </Typography>
              <Typography variant="body2">Registration Date</Typography>
            </Grid>
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
                    <Typography variant="body1">{singleBeneficiary?.bankAccountNumber}</Typography>
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
