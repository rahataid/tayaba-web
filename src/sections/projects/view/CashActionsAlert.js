import { useState, useCallback, useEffect } from 'react';
import useLoading from '@hooks/useLoading';
import { Alert, Grid, Button } from '@mui/material';
import { useRahat } from '@services/contracts/useRahat';
import { SPACING } from '@config';
import { useRahatCash } from '@services/contracts/useRahatCash';
import { useProjectContext } from '@contexts/projects';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
export default function CashActionsAlert({ projectId }) {
  const { refresh, refreshData, singleProject } = useProjectContext();
  const { projectBalance, rahatChainData, contract, claimTokenForProject } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();
  const { loading, showLoading, hideLoading } = useLoading();
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    action: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const { sendCashToAgency } = useRahatDonor();

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
      await claimTokenForProject(projectId, rahatChainData.cashAllowance);
      refreshData();
      hideLoading('cashTrack');
    },
    async sendCashToAgency(amount) {
      showLoading('cashTransfer');
      await sendCashToAgency(amount);
      refreshData();
      hideLoading('cashTransfer');
    },
  };

  const acceptCashAction = useCallback(() => {
    if (rahatChainData?.cashAllowance > 0) {
      setAlert({
        type: 'success',
        message: 'Accept Cash',
        action: <Button onClick={CashActions.acceptCash}>Accept</Button>,
      });
      setShowAlert(true);
    }
  }, [rahatChainData?.cashAllowance]);

  useEffect(() => {
    acceptCashAction();
  }, [acceptCashAction]);

  return (
    <>
      {showAlert && (
        <Grid item xs={12} md={12}>
          <Alert severity={alert.type} action={alert.action}>
            {' '}
            {alert?.message}{' '}
          </Alert>
        </Grid>
      )}
    </>
  );
}
