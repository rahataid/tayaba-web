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

    assignClaimsToBeneficiaries(singleBeneficiary?.data?.walletAddress, 1).then(async (res) => {
      const txn = {
        txHash: res?.hash,
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
      refreshData();
    });

    hideLoading('assignClaim');
    hideDialog();
  };

  const handleActivate = async () => {
    activateBeneficiary(singleBeneficiary?.data?.walletAddress).then(() => {
      refreshData();
    });
  };

  return (
    <Card sx={{ width: '100%', mb: SPACING.GRID_SPACING }}>
      <Dialog open={isDialogShow} onClose={hideDialog}>
        {/* <LoadingOverlay open={loading.assignClaim}> */}
        <DialogTitle> Are you sure to assign claim ?</DialogTitle>
        <DialogActions>
          <Button onClick={hideDialog}>Cancel</Button>
          <Button variant="outlined" onClick={handleAssignClaim}>
            Assign
          </Button>
        </DialogActions>
        {/* </LoadingOverlay> */}
      </Dialog>

      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography>Claims Details</Typography>
          {chainData?.isBenActive ? (
            <>
              {(roles.isManager || roles.isAdmin) && (
                <Button variant="outlined" onClick={showDialog} size="small">
                  {' '}
                  Assign Claim
                </Button>
              )}
            </>
          ) : (
            <>
              {roles.isAdmin && (
                <Button
                  variant="outlined"
                  onClick={handleActivate}
                  disabled={roles?.isDonor ? true : false}
                  size="small"
                >
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
          <Typography variant="caption">Claimed</Typography>

          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="caption">{moment().format('DD/MMM/YYYY')}</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="caption">{chainData?.balance || 0}</Typography>
          </Grid>
        </Stack>

        <Stack
          sx={{ pt: SPACING.GRID_SPACING }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Typography variant="caption">Received</Typography>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="caption">{moment().format('DD/MMM/YYYY')}</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="caption">{chainData?.totalTokenIssued || 0}</Typography>
          </Grid>
          {/* <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="h4">{chainData?.totalTokenIssued || 0}</Typography>
            <Typography variant="body2">Eth Balance</Typography>
          </Grid> */}
        </Stack>
        <Stack
          sx={{ pt: SPACING.GRID_SPACING, overflow: 'elipsis' }}
          direction="row"
          // justifyContent="space-between"
          justifyContent={'flex-start'}
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Typography variant="caption">Wallet</Typography>

          <WalletExplorerButton address={singleBeneficiary?.data?.walletAddress} type="address" truncateLength={8} />
        </Stack>
      </CardContent>
    </Card>
  );
}
