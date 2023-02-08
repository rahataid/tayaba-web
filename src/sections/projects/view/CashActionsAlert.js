import { useState, useCallback, useEffect } from 'react';
import useLoading from '@hooks/useLoading';
import { Alert, Grid, Button } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import { useProject } from '@services/contracts/useProject';
import { useAuthContext } from 'src/auth/useAuthContext';
// import LoadingOverlay from '@components/LoadingOverlay';

export default function CashActionsAlert({ projectId, chainData }) {
  const { refresh, singleProject, refreshData } = useProjectContext();
  const { acceptToken, contract } = useProject();
  const { loading, showLoading, hideLoading } = useLoading();
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    action: '',
  });
  const { roles } = useAuthContext();
  const [showAlert, setShowAlert] = useState(false);
  // const { sendH2OWheelsToVendor } = useProject();

  const CashActions = {
    async acceptCash() {
      showLoading('project-view');
      await acceptToken(chainData.tokenAllowance);
      setShowAlert(false);
      hideLoading('project-view');
    },
  };

  const donorAllowance = useCallback(() => {
    if (chainData.tokenAllowance > 0) {
      setAlert({
        type: 'info',
        message: `Pending acceptance of ${chainData.tokenAllowance} H2O wheels.`,
      });
      setShowAlert(chainData.tokenAllowance > 0);
    }
  }, [chainData.tokenAllowance]);

  const acceptCashAction = useCallback(() => {
    if (chainData.tokenAllowance > 0) {
      setAlert({
        type: 'success',
        message: `Confirm receival of ${chainData.tokenAllowance} H2O wheels`,
        action: <Button onClick={CashActions.acceptCash}>Accept</Button>,
      });
      setShowAlert(chainData.tokenAllowance > 0);
    }
  }, [chainData.tokenAllowance]);

  useEffect(() => {
    if (!roles.isDonor) return;
    donorAllowance();
  }, [donorAllowance]);

  useEffect(() => {
    if (!roles.isAdmin) return;
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
