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
import { useAuthContext } from 'src/auth/useAuthContext';

TokenDetails.propTypes = {};
export default function TokenDetails() {
  const { chainData, singleBeneficiary } = useBeneficiaryContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { assignClaimsToBeneficiaries, beneficiaryBalance, contract } = useProject();
  const { loading, showLoading, hideLoading } = useLoading();
  const { roles } = useAuthContext();
  const handleAssignClaim = async () => {
    showLoading('assignClaim');
    try {
      const res = await assignClaimsToBeneficiaries(singleBeneficiary?.data?.walletAddress, 1);
      const txn = {
        txHash: res.hash,
        contractAddress: contract?.address,
        timestamp: Date.now(),
        beneficiaryId: singleBeneficiary?.data?.id,
        vendorId: singleBeneficiary?.data?.vendor?.id || 1,
        projectId: singleBeneficiary?.data?.beneficiary_project_details[0].id,
        amount: 1,
        isOffline: false,
        txType: 'wallet',
      };
    } catch (error) {
      console.log(error);
    }
    hideLoading('assignClaim');
    hideDialog();
  };

  return (
    <Card sx={{ width: '100%', mb: SPACING.GRID_SPACING }}>
      <Dialog open={isDialogShow} onClose={hideDialog}>
        <LoadingOverlay open={loading.assignClaim}>
          <DialogTitle> Are you sure to assign claim ?</DialogTitle>
          <DialogActions>
            <Button onClick={hideDialog}>Cancel</Button>
            <Button variant="outlined" onClick={handleAssignClaim}>
              Assign
            </Button>
          </DialogActions>
        </LoadingOverlay>
      </Dialog>

      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="h5">Claims Details</Typography>
          {chainData?.isBenActive && (
            <>
              {(roles.isManager || roles.isAdmin) && (
                <Button variant="outlined" onClick={showDialog}>
                  {' '}
                  Assign Claim
                </Button>
              )}
            </>
          )}
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
            <Typography variant="body1">{chainData?.balance || 0}</Typography>
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
        <Stack
          sx={{ pt: SPACING.GRID_SPACING, overflow: 'elipsis' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Typography variant="subtitle2"> wallet </Typography>

          <Grid container direction="column" justifyContent="center" alignItems="center">
            <a href={`https://explorer.rumsan.com/address/${singleBeneficiary?.data?.walletAddress}`}>
              <Typography sx={{ overflow: 'elipsis' }} variant="body2">
                {singleBeneficiary?.data?.walletAddress}
              </Typography>
            </a>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
