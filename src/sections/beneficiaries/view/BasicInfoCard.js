import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useProject } from '@services/contracts/useProject';

BasicInfoCard.propTypes = {
  chainData: PropTypes.object,
};

export default function BasicInfoCard({ chainData }) {
  const { singleBeneficiary, setChainData, refreshData } = useBeneficiaryContext();
  const { roles } = useAuthContext();
  const { activateBeneficiary } = useProject();

  const handleActivate = async () => {
    try {
      let isActive = await activateBeneficiary(singleBeneficiary?.data?.walletAddress);
      setChainData({ isBenActive: isActive });
      refreshData();
    } catch (error) {}
  };

  return (
    <Card sx={{ width: '100%', mb: 1 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {roles?.isDonor
              ? singleBeneficiary?.data?.name
              : singleBeneficiary?.data?.name.substring(0, 1) + 'xxxxxxx Xxxxx'}
          </Typography>
          <div>
            {chainData?.isBenActive ? (
              <Chip label="Active" variant="outlined" color="success" />
            ) : (
              <Chip label="Inactive" onClick={handleActivate} variant="outlined" color="error" />
            )}
          </div>
        </Stack>

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h6">{singleBeneficiary?.data?.phone}</Typography>
            <Typography variant="body2">Phone</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h6">{singleBeneficiary?.data?.gender}</Typography>
            <Typography variant="body2">Gender</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Typography variant="h6">{singleBeneficiary?.data?.cnicNumber}</Typography>
              <Typography variant="body2">Cnic Number</Typography>
            </Grid>
          </Grid>
        </Stack>

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="h6">{singleBeneficiary?.data?.village_details?.district}</Typography>
            <Typography variant="body2">District</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Typography variant="h6">{singleBeneficiary?.data?.dailyWaterConsumption} Ltrs</Typography>
            <Typography variant="body2">Daily Water Consumption</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Grid item xs={12} md={12}>
              <Typography variant="h6">{singleBeneficiary?.data?.dailyDistanceCovered} KM</Typography>
              <Typography variant="body2">Daily Distance Covered</Typography>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
