/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Stack, Typography, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { SPACING } from '@config';
import moment from 'moment';
import useDialog from '@hooks/useDialog';
import useLoading from '@hooks/useLoading';
import LoadingOverlay from '@components/LoadingOverlay';
import { useAuthContext } from 'src/auth/useAuthContext';
import { TransactionService } from '@services';
import WalletExplorerButton from '@components/button/WalletExplorerButton';
import { useProject } from '@services/contracts/useProject';

TokenDetails.propTypes = {};
export default function TokenDetails({ chainData }) {
  const { singleBeneficiary, refreshData } = useBeneficiaryContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { assignClaimsToBeneficiaries, contract } = useProject();
  const { loading, showLoading, hideLoading } = useLoading();
  const { roles } = useAuthContext();
  const { activateBeneficiary } = useProject();

  const handleAssignClaim = async () => {
    showLoading('assignClaim');
    try {
      const res = await assignClaimsToBeneficiaries(singleBeneficiary?.data?.walletAddress, 1);
      const txn = {
        txHash: res.hash,
        contractAddress: contract?.address,
        timestamp: Math.floor(Date.now() / 1000),
        beneficiaryId: singleBeneficiary?.data?.id,
        vendorId: singleBeneficiary?.data?.vendor?.id || 1,
        projectId: singleBeneficiary?.data?.beneficiary_project_details[0].id || 1,
        amount: 1,
        isOffline: false,
        txType: 'wallet',
      };
      await TransactionService.addTransactionData(txn);
    } catch (error) {
      console.log(error);
    }
    hideLoading('assignClaim');
    hideDialog();
  };

  const handleActivate = async () => {
    try {
      await activateBeneficiary(singleBeneficiary?.data?.walletAddress);
      refreshData();
    } catch (error) {
      console.log(error);
    }
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
          {chainData?.isBenActive ? (
            <>
              {(roles.isManager || roles.isAdmin) && (
                <Button variant="outlined" onClick={showDialog}>
                  {' '}
                  Assign Claim
                </Button>
              )}
            </>
          ) : (
            <>
              {!roles.isDonor && (
                <Button variant="outlined" onClick={handleActivate} disabled={roles?.isDonor ? true : false}>
                  {' '}
                  Activate
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
          <Typography variant="subtitle2"> Wallet </Typography>

          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              <WalletExplorerButton address={singleBeneficiary?.data?.walletAddress} type="address" />
            </Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{}</Typography>
            <Typography variant="body2"></Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
