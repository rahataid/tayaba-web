import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useVendorsContext } from '@contexts/vendors';
import { useRahat } from '@services/contracts/useRahat';
import { useSnackbar } from 'notistack';
import AmountForm from '@sections/projects/cash-tracker/AmountForm';
import useDialog from '@hooks/useDialog';
import { useProject } from '@services/contracts/useProject';
import { useAuthContext } from 'src/auth/useAuthContext';
import LoadingOverlay from '@components/LoadingOverlay';
import useLoading from '@hooks/useLoading';

ReleaseCashButton.propTypes = {};

export default function ReleaseCashButton() {
  const { enqueueSnackbar } = useSnackbar();
  const { singleVendor, refreshData, chainData, refresh } = useVendorsContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { projectBalance, addVendor, transferCashToVendor, rahatChainData, contract } = useRahat();
  const { sendH2OWheelsToVendor, h2oToken, getProjectBalance } = useProject();
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
    async activateVendor() {
      if (!singleVendor?.walletAddress) return Actions.alert('Must have vendor address', 'error');
      await addVendor(singleVendor.walletAddress);
      refreshData();
    },
    async releaseH2oToken(amount) {
      if (!roles.isAdmin) return;
      if (!singleVendor.walletAddress) return Actions.alert('Must have vendor address', 'error');
      if (amount > rahatChainData?.cashBalance) return Actions.alert('Not enough balance to send', 'error');
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
    async (projectId) => {
      await projectBalance(projectId);
    },
    [contract]
  );
  const getBalance = useCallback(
    async () => {
      if (!h2oToken) return;
      try {
        let token = await getProjectBalance();
        setTokenBalance(100);
      } catch (err) {
        console.log(err);
      }
    },
    []
    //[h2oToken]
  );

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
      {true ? (
        <LoadingOverlay open={loading.transferToken}>
          <Button variant="outlined" color="success" onClick={showDialog}>
            Release Cash
          </Button>
        </LoadingOverlay>
      ) : (
        <Button variant="outlined" color="primary" onClick={Actions.activateVendor}>
          Activate Vendor
        </Button>
      )}
    </div>
  );
}
