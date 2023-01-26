import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useEffect, useState } from 'react';

import { useVendorsContext } from '@contexts/vendors';
import { useSnackbar } from 'notistack';
import AmountForm from '@sections/projects/cash-tracker/AmountForm';
import useDialog from '@hooks/useDialog';
import { useProject } from '@services/contracts/useProject';
import { useAuthContext } from 'src/auth/useAuthContext';
import LoadingOverlay from '@components/LoadingOverlay';
import useLoading from '@hooks/useLoading';
import { ROLES } from '@config';

ReleaseCashButton.propTypes = {};

export default function ReleaseCashButton() {
  const { enqueueSnackbar } = useSnackbar();
  const { singleVendor, refreshData, chainData, refresh } = useVendorsContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { sendH2OWheelsToVendor, h2oToken, getProjectBalance, activateVendor } = useProject();
  const [tokenBalance, setTokenBalance] = useState(0);
  const { roles } = useAuthContext();
  const { loading, showLoading, hideLoading } = useLoading();
  const Actions = {
    alert(message, type) {
      enqueueSnackbar(message, {
        sx: {
          '& .SnackbarContent-root': {
            backgroundColor: '#e6ebf1 !important',
          },
        },
        variant: type || 'info',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    },
    async handleActivateVendor() {
      // if (!singleVendor?.walletAddress) return Actions.alert('Must have vendor address', 'error');
      console.log({ singleVendor });
      try {
        showLoading('activateVendor');
        await activateVendor(singleVendor?.walletAddress);
      } catch (error) {
        console.log(error);
      }
      hideLoading('activateVendor');
      refreshData();
    },

    async releaseH2oToken(amount) {
      if (!roles.isAdmin) return;
      if (!singleVendor.walletAddress) return Actions.alert('Must have vendor address', 'error');
      showLoading('transferToken');
      try {
        await sendH2OWheelsToVendor(singleVendor.walletAddress, amount);
      } catch (err) {
        console.log(err);
      }
      refreshData();
      hideLoading('transferToken');
    },
  };

  const init = useCallback(
    // async (projectId) => {
    //   await projectBalance(projectId);
    // },
    []
  );
  const getBalance = useCallback(async () => {
    if (!h2oToken) return;
    try {
      let token = await getProjectBalance();
      setTokenBalance(token);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(async () => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    if (!singleVendor?.projects?.length) return;
    init(singleVendor?.projects[0].id);
  }, [init, refresh, singleVendor]);

  return (
    <div>
      <AmountForm
        title="Release token to village"
        description={
          <>
            Please select the amount of H2o token are handing over to village .Village Vendors has to accept the cash
            before they are allowed for disburse. <br />
            <br />
            Your current H20 tokens is {tokenBalance}
          </>
        }
        approveCashTransfer={Actions.releaseH2oToken}
        handleClose={hideDialog}
        open={isDialogShow}
      />
      {chainData.isActive ? (
        <LoadingOverlay open={loading.transferToken}>
          <Button variant="outlined" color="success" onClick={showDialog}>
            send H2O token
          </Button>
        </LoadingOverlay>
      ) : (
        <LoadingOverlay open={loading.activateVendor}>
          <Button variant="outlined" color="primary" onClick={Actions.handleActivateVendor}>
            Activate Vendor
          </Button>
        </LoadingOverlay>
      )}
    </div>
  );
}
