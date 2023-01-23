import { useState, useCallback, useEffect } from 'react';
import useLoading from '@hooks/useLoading';
import { Alert, Grid, Button } from '@mui/material';
import { useRahatAdmin } from '@services/contracts/useRahatAdmin';
import { useRahat } from '@services/contracts/useRahat';
import { useRahatCash } from '@services/contracts/useRahatCash';
import { useProjectContext } from '@contexts/projects';
import { useProject } from '@services/contracts/useProject';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import LoadingOverlay from '@components/LoadingOverlay';

export default function CashActionsAlert({ projectId }) {
  const { refresh, refreshData, singleProject } = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { claimCash, getBalance, rahatTokenContract } = useRahatAdmin();
  const { contractWS: RahatCash } = useRahatCash();
  const { loading, showLoading, hideLoading } = useLoading();
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    action: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const { sendH2OWheelsToVendor } = useProject();

  const init = useCallback(async () => {
    if (!RahatCash) return;
    await projectBalance(projectId);
  }, [projectId, contract, RahatCash, refresh]);

  useEffect(() => {
    if (!projectId || !contract) return;
    init(projectId);
  }, [projectId, RahatCash, refresh]);

  useEffect(() => {
    RahatCash?.on('Approval', refreshData);
    RahatCash?.on('Transfer', refreshData);
    return () => RahatCash?.removeAllListeners();
  }, [RahatCash]);

  const CashActions = {
    async acceptCash() {
      showLoading('cashTrack');
      await claimCash(projectId);
      refreshData();
      setShowAlert(false);
      hideLoading('cashTrack');
    },
    async acceptTokenByVendor(tokenNos) {
      showLoading('cashTransfer');
      await acceptH2OByVendors(amount);
      refreshData();
      setShowAlert(false);
      hideLoading('cashTransfer');
    },
  };

  const acceptCashAction = useCallback(async () => {
    if (!rahatTokenContract) return;
    const cash = await getBalance();
    if (cash > 0) {
      setAlert({
        type: 'success',
        message: 'Accept Cash',
        action: <Button onClick={CashActions.acceptCash}>Accept</Button>,
      });
      setShowAlert(true);
    }
  }, [rahatTokenContract?.allowance]);

  const acceptTokenAction = useCallback(() => {
    if (rahatChainData?.cashAllowance > 0) {
      setAlert({
        type: 'success',
        message: 'Accept Token',
        action: <Button onClick={CashActions.acceptTokenByVendor}>Accept</Button>,
      });
      setShowAlert(true);
    }
  }, [rahatChainData?.cashAllowance]);

  useEffect(() => {
    acceptCashAction();
  }, [acceptCashAction]);

  useEffect(() => {
    acceptCashAction();
  }, [acceptCashAction]);

  return (
    <>
      {showAlert && (
        <Grid item xs={12} md={12}>
          <LoadingOverlay open={loading.cashTrack}>
            <Alert severity={alert.type} action={alert.action}>
              {' '}
              {alert?.message}{' '}
            </Alert>
          </LoadingOverlay>
        </Grid>
      )}
    </>
  );
}
