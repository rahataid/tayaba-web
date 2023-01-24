import { useState, useCallback, useEffect } from 'react';
import useLoading from '@hooks/useLoading';
import { Alert, Grid, Button } from '@mui/material';
import { useRahatToken } from '@services/contracts/useRahatToken';
import { useProjectContext } from '@contexts/projects';
import { useProject } from '@services/contracts/useProject';
import { useAuthContext } from 'src/auth/useAuthContext';
import LoadingOverlay from '@components/LoadingOverlay';

export default function CashActionsAlert({ projectId }) {
  const { refresh, refreshData, singleProject } = useProjectContext();
  const { claimCash, getBudget, contract } = useRahatToken();
  const { loading, showLoading, hideLoading } = useLoading();
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    action: '',
  });
  const { roles } = useAuthContext();
  const [showAlert, setShowAlert] = useState(false);
  const { sendH2OWheelsToVendor } = useProject();

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
      await acceptH2OByVendors(tokenNos);
      refreshData();
      setShowAlert(false);
      hideLoading('cashTransfer');
    },
  };

  const acceptCashAction = useCallback(async () => {
    if (!contract) return;
    const cash = await getBudget();
    if (cash > 0) {
      setAlert({
        type: 'success',
        message: `Accept Cash Amount ${cash}`,
        action: <Button onClick={CashActions.acceptCash}>Accept</Button>,
      });
      setShowAlert(true);
    }
  }, [contract]);

  const acceptTokenAction = useCallback(() => {
    // if (rahatChainData?.cashAllowance > 0) {
    //   setAlert({
    //     type: 'success',
    //     message: 'Accept Token',
    //     action: <Button onClick={CashActions.acceptTokenByVendor}>Accept</Button>,
    //   });
    //   setShowAlert(true);
    // }
  }, []);

  useEffect(() => {
    if (!roles.isAdmin) return;
    acceptCashAction();
  }, [acceptCashAction]);

  useEffect(() => {
    if (!roles.isManager) return;
    acceptTokenAction();
  }, [acceptTokenAction]);

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
