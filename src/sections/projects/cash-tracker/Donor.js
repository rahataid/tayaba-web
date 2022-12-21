/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { useRahatCash } from '@services/contracts/useRahatCash';
import AmountForm from './AmountForm';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import useDialog from '@hooks/useDialog';
import LoadingOverlay from '@components/LoadingOverlay';
import useLoading from '@hooks/useLoading';

Donor.propTypes = {};

export default function Donor() {
  const { refresh, refreshData } = useProjectContext();
  const { totalSupply, getDonorBalance, getAgencyAllowance, contract } = useRahatCash();
  const { sendCashToAgency } = useRahatDonor();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { loading, showLoading, hideLoading } = useLoading();

  const [data, setData] = useState({
    totalSupply: 0,
    donorBalance: 0,
    agencyAllowance: 0,
  });

  const {
    query: { projectId },
  } = useRouter();

  const CashActions = {
    async sendCashToAgency(amount) {
      showLoading('cashTransfer');
      await sendCashToAgency(amount);
      refreshData();
      hideLoading('cashTransfer');
    },
  };

  const init = useCallback(async () => {
    if (!contract) return;
    const _tSupply = await totalSupply();
    const _donorBalance = await getDonorBalance();
    const _agencyAllowance = await getAgencyAllowance();
    setData((d) => ({
      ...d,
      totalSupply: _tSupply?.toNumber(),
      donorBalance: _donorBalance.toNumber(),
      agencyAllowance: _agencyAllowance.toNumber(),
    }));
  }, [contract, refresh]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <AmountForm
        title="Send Cash to UNICEF Nepal"
        description={
          <>
            Please enter the amount you wish to send to palika. Palika has to accept the cash before it is fully
            transferred and allowed for disbursement.
          </>
        }
        approveCashTransfer={CashActions.sendCashToAgency}
        handleClose={hideDialog}
        open={isDialogShow}
      />
      <LoadingOverlay open={loading.cashTransfer}>
        <Card sx={{ width: '100%', mb: 1 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Cash Fund Tracker (Donor)
              </Typography>
            </Stack>

            <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography variant="h4" sx={{ fontWeight: 400 }}>
                  <small>₹</small> {data?.totalSupply || '0'}
                </Typography>
                <small>Total Cash Disbursed</small>
                <Typography variant="h5" sx={{ fontWeight: 200 }}>
                  <small>₹</small> {data?.agencyAllowance || '0'}
                </Typography>
                <small>Pending Acceptance by Country Office</small>
                <Button sx={{ mt: 2 }} size="small" variant="outlined" onClick={showDialog}>
                  Send cash to UNICEF Nepal
                </Button>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </LoadingOverlay>
    </>
  );
}
