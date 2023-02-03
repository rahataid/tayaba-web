import Button from '@mui/material/Button';
import { useVendorsContext } from '@contexts/vendors';
import { useSnackbar } from 'notistack';
import AmountForm from '@sections/projects/cash-tracker/AmountForm';
import useDialog from '@hooks/useDialog';
import { useProject } from '@services/contracts/useProject';
import { useAuthContext } from 'src/auth/useAuthContext';
import LoadingOverlay from '@components/LoadingOverlay';
import useLoading from '@hooks/useLoading';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useState } from 'react';

SendToken.propTypes = {};

export default function SendToken() {
  const { enqueueSnackbar } = useSnackbar();
  const { singleVendor, refreshData, chainData, refresh, updateApprovalStatus } = useVendorsContext();
  const { handleContractError } = useErrorHandler();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { sendH2OWheelsToVendor, activateVendor } = useProject();
  const { roles } = useAuthContext();
  const { loading, showLoading, hideLoading } = useLoading();
  const [loadingKey, setLoadingKey] = useState(null);
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
        showLoading('activateVendor');

        await activateVendor(singleVendor?.walletAddress);
        await updateApprovalStatus(singleVendor?.walletAddress);
      } catch (error) {
        handleContractError(error);
      }
      hideLoading('activateVendor');
      refreshData();
    },

    async releaseH2oToken(amount) {
      if (!roles.isAdmin) return;
      if (!singleVendor.walletAddress) return Actions.alert('Must have vendor address', 'error');
      try {
        await sendH2OWheelsToVendor(singleVendor.walletAddress, amount);
        setLoadingKey('transferToken');
      } catch (err) {
        console.log(err);
      }
      refreshData();
    },
  };

  return (
    <div>
      <AmountForm
        title="Release token to Distributor"
        description={
          <>
            Please select the amount of H2O token you are handing over to the distributor. Distributor/Vendors have to
            accept the cash before the tokens are disbursed. <br />
            <br />
            Your current H20 tokens is {chainData?.projectBalance}
          </>
        }
        approveCashTransfer={Actions.releaseH2oToken}
        handleClose={hideDialog}
        open={isDialogShow}
        loadingKey={loadingKey}
      />
      {roles.isAdmin && (
        <>
          {chainData.isActive ? (
            <Button variant="outlined" color="success" onClick={showDialog}>
              send H2O token
            </Button>
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
