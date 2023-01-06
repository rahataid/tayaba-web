/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { useRahatCash } from '@services/contracts/useRahatCash';
import AmountForm from './AmountForm';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { useRahatAdmin } from '@services/contracts/useRahatAdmin';
import { useRahat } from '@services/contracts/useRahat';
import useDialog from '@hooks/useDialog';
import LoadingOverlay from '@components/LoadingOverlay';
import useLoading from '@hooks/useLoading';

Agency.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function Agency({ rahatChainData }) {
  //#region States, Contexts, Hooks
  const { refresh, refreshData } = useProjectContext();
  const { getAllowanceAndBalance, agencyChainData, sendToPalika, claimCash, contract } = useRahatAdmin();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { loading, showLoading, hideLoading } = useLoading();

  const {
    query: { projectId },
  } = useRouter();

  //#endregion

  const CashActions = {
    async acceptCash() {
      showLoading('cashTrack');
      await claimCash(agencyChainData.cashAllowance);
      refreshData();
      hideLoading('cashTrack');
    },

    async sendCashToPalika(amount) {
      if (amount > agencyChainData?.cashBalance) {
        alert('Not enough balance to send');
        return;
      }
      showLoading('cashTrack');
      await sendToPalika(projectId, amount);
      refreshData();
      hideLoading('cashTrack');
    },
  };

  //#region UseEffects

  const init = useCallback(async () => {
    await getAllowanceAndBalance();
    // if (projectId) await projectBalance(projectId);
  }, [contract, projectId, refresh]);

  useEffect(() => {
    init();
  }, [init]);

  //#endregion

  return (
    <>
      <AmountForm
        title="Send Cash to Palika"
        description={
          <>
            Please select the amount you wish to send to palika. Palika has to accept the cash before it is fully
            transferred and allowed for disbursement. <br />
            <br />
            Your currentBalance is {agencyChainData?.cashBalance}
          </>
        }
        cashBalance={agencyChainData?.cashBalance}
        approveCashTransfer={CashActions.sendCashToPalika}
        handleClose={hideDialog}
        open={isDialogShow}
      />
      <LoadingOverlay open={loading.cashTrack}>
        <Card sx={{ width: '100%', mb: 1 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Cash Fund Tracker (Agency)
              </Typography>
            </Stack>

            {agencyChainData?.cashAllowance > 0 && (
              <Alert
                sx={{ mt: 2 }}
                action={
                  <Button color="inherit" size="small" onClick={CashActions.acceptCash}>
                    Accept
                  </Button>
                }
              >
                {' '}
                You have received रु. {agencyChainData?.cashAllowance}.
              </Alert>
            )}

            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  <small>रु.</small> {agencyChainData?.cashBalance || '100'}
                </Typography>
                <small>Your cash tokens</small>
                <Typography variant="h5" sx={{ fontWeight: 200 }}>
                  <small>रु.</small> {rahatChainData.cashAllowance || '100'}
                </Typography>
                <small>Pending Acceptance by Palika</small>
                <Button sx={{ mt: 2 }} size="small" variant="outlined" onClick={showDialog}>
                  Send token
                </Button>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </LoadingOverlay>
    </>
  );
}
