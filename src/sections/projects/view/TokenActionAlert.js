import { useProjectContext } from '@contexts/projects';
import useLoading from '@hooks/useLoading';
import { Alert, AlertTitle, Button, Grid } from '@mui/material';
import { useProject } from '@services/contracts/useProject';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';

TokenActionAlert.propTypes = {
  chainData: PropTypes.object,
};

export default function TokenActionAlert({ chainData }) {
  const { acceptToken } = useProject();
  const { singleProject } = useProjectContext();
  const { showLoading, hideLoading } = useLoading();
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
    if (chainData?.tokenAllowance > 0) {
      setAlert({
        type: 'info',
        message: `Pending acceptance of ${chainData.tokenAllowance} H2O wheels.`,
      });
    }
    setShowAlert(chainData.tokenAllowance > 0);
  }, [chainData?.tokenAllowance]);

  const acceptCashAction = useCallback(() => {
    if (chainData.tokenAllowance > 0) {
      setAlert({
        type: 'success',
        message: `Confirm receival of ${chainData.tokenAllowance} H2O wheels`,
        action: <Button onClick={CashActions.acceptCash}>Accept</Button>,
      });
    }
    setShowAlert(chainData.tokenAllowance > 0);
  }, [chainData?.tokenAllowance]);

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
      <>
        {singleProject?.isApproved === false && (
          <Grid item xs={12} md={12}>
            <Alert title="Not Approved" severity={'warning'}>
              <AlertTitle>
                <strong>Waiting for approval</strong>
              </AlertTitle>
              Project has not yet been approved by the community.
            </Alert>
          </Grid>
        )}
      </>
    </>
  );
}
