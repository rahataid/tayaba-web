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

ReleaseCashButton.propTypes = {};

export default function ReleaseCashButton() {
  const { enqueueSnackbar } = useSnackbar();
  const { singleVendor, refreshData, chainData, refresh, updateApprovalStatus } = useVendorsContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { sendH2OWheelsToVendor, activateVendor } = useProject();
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
      try {
        console.group({ Hi: 'hiii' });
        showLoading('activateVendor');

        await activateVendor(singleVendor?.walletAddress);
        await updateApprovalStatus(singleVendor?.walletAddress);
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

  // async (projectId) => {
  //   await projectBalance(projectId);
  // },
  //[]

  return (
    <div>
      <AmountForm
        title="Release token to village"
        description={
          <>
            Please select the amount of H2o token are handing over to village .Village Vendors has to accept the cash
            before they are allowed for disburse. <br />
            <br />
            Your current H20 tokens is {chainData?.projectBalance}
          </>
        }
        approveCashTransfer={Actions.releaseH2oToken}
        handleClose={hideDialog}
        open={isDialogShow}
      />
      {roles.isDonor && (
        <>
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
        </>
      )}
    </div>
  );
}
