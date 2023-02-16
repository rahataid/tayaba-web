import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { useAppAuthContext } from 'src/auth/JwtContext';

BasicInfoCard.propTypes = {
  chainData: PropTypes.object,
};

export default function BasicInfoCard({ chainData }) {
  const { singleBeneficiary } = useBeneficiaryContext();
  const { roles } = useAppAuthContext();

  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Typography sx={{ fontWeight: 600 }}>
            {roles.isStakeholder ? 'XXXX' : singleBeneficiary?.data?.name}
          </Typography>
          <div>
            <Chip
              label={chainData?.isBenActive ? 'Active' : 'Inactive'}
              variant="outlined"
              color={chainData?.isBenActive ? 'success' : 'error'}
            />
          </div>
        </Stack>

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="caption1">{roles.isStakeholder ? 'XXXX' : singleBeneficiary?.data?.phone}</Typography>
            <Typography variant="subtitle2">Phone</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="caption1">{roles.isStakeholder ? 'XX' : singleBeneficiary?.data?.gender}</Typography>
            <Typography variant="subtitle2">Gender</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Typography variant="caption1">
                {roles?.isStakeholder ? 'XXX' : singleBeneficiary?.data?.cnicNumber}
              </Typography>
              <Typography variant="subtitle2">CNIC Number</Typography>
            </Grid>
          </Grid>
        </Stack>

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="caption1">
              {roles.isStakeholder ? 'XXXX' : singleBeneficiary?.data?.village_details?.district}
            </Typography>
            <Typography variant="subtitle2">District</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Typography variant="caption1">
              {roles.isStakeholder ? 'XX' : singleBeneficiary?.data?.dailyWaterConsumption} Ltrs
            </Typography>
            <Typography variant="subtitle2">Daily Water Consumption</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Typography variant="caption1">
                {roles.isStakeholder ? 'XX' : singleBeneficiary?.data?.dailyDistanceCovered} KM
              </Typography>
              <Typography variant="subtitle2">Daily Distance Covered</Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
