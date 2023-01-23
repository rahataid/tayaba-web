/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Stack, Typography, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { SPACING } from '@config';
import moment from 'moment';
import useDialog from '@hooks/useDialog';
import { useProject } from '@services/contracts/useProject';
import useLoading from '@hooks/useLoading';
import LoadingOverlay from '@components/LoadingOverlay';

TokenDetails.propTypes = {};
export default function TokenDetails() {
  const { chainData, singleBeneficiary } = useBeneficiaryContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { assignClaimsToBeneficiaries, beneficiaryBalance } = useProject();
  const { loading, showLoading, hideLoading } = useLoading();
  const [balance, setBalance] = useState(0);
  //const { beneficiaryBalance, beneficiaryData, contract } = useRahat();
  const handleAssignClaim = async () => {
    showLoading('assignClaim');
    await assignClaimsToBeneficiaries(singleBeneficiary.walletAddress, 1);
    hideLoading('assignClaim');
  };

  useEffect(async () => {
    try {
      let amount = await beneficiaryBalance(singleBeneficiary.walletAddress);
      setBalance(amount);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Card sx={{ width: '100%', mb: SPACING.GRID_SPACING }}>
      <Dialog open={isDialogShow} onClose={hideDialog}>
        <DialogTitle> Are you sure to assign claim ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleAssignClaim}> YES</Button>
          <Button onClick={hideDialog}> NO</Button>
        </DialogActions>
      </Dialog>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="h5">Claims Details</Typography>
          <LoadingOverlay open={loading.assignClaim}>
            <Button variant="outlined" onClick={showDialog}>
              {' '}
              Assign Claim
            </Button>
          </LoadingOverlay>
        </Stack>
        <Stack
          sx={{ pt: SPACING.GRID_SPACING }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Typography variant="subtitle2"> Claims Assigned</Typography>

          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="body1">{moment().format('DD MMM, YYYY')}</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="body1">{balance}</Typography>
          </Grid>
        </Stack>

        <Stack
          sx={{ pt: SPACING.GRID_SPACING }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Typography variant="subtitle2">H20 wheels received</Typography>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="body1">{moment().format('DD MMM, YYYY')}</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="body1">{chainData?.totalTokenIssued || 0}</Typography>
          </Grid>
          {/* <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.totalTokenIssued || 0}</Typography>
            <Typography variant="body2">Eth Balance</Typography>
          </Grid> */}
        </Stack>
      </CardContent>
    </Card>
  );
}
