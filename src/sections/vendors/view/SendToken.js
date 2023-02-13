import { useVendorsContext } from '@contexts/vendors';
import { useSnackbar } from 'notistack';
import AmountForm from '@sections/projects/token-tracker/AmountForm';
import useDialog from '@hooks/useDialog';
import { useProject } from '@services/contracts/useProject';
import { useAuthContext } from 'src/auth/useAuthContext';
// import LoadingOverlay from '@components/LoadingOverlay';
import useLoading from '@hooks/useLoading';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { LoadingButton } from '@mui/lab';

SendToken.propTypes = {};

export default function SendToken() {
  const { enqueueSnackbar } = useSnackbar();
  const { singleVendor, refreshData, chainData, refresh, updateApprovalStatus } = useVendorsContext();
  const { handleContractError } = useErrorHandler();
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
      showLoading('activateVendor');

      activateVendor(singleVendor?.walletAddress).then(async () => {
        await updateApprovalStatus(singleVendor?.walletAddress);
        hideLoading('activateVendor');
        refreshData();
      });
    },

    async releaseH2oToken(amount) {
      if (!roles.isAdmin) return;
      if (!singleVendor.walletAddress) return Actions.alert('Must have vendor address', 'error');
      showLoading('releaseH2oToken', true);
      sendH2OWheelsToVendor(singleVendor.walletAddress, amount).then(async () => {
        refreshData();
        hideLoading('releaseH2oToken');
      });
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
            Your current H2O tokens is {chainData?.projectBalance}
          </>
        }
        approveCashTransfer={Actions.releaseH2oToken}
        handleClose={hideDialog}
        open={isDialogShow}
        loadingKey={loading['releaseH2oToken']}
      />
      {roles.isAdmin && (
        <>
          {chainData.isActive ? (
            <LoadingButton
              variant="outlined"
              color="success"
              onClick={showDialog}
              loading={loading['releaseH2oToken']}
              disabled={loading['releaseH2oToken']}
            >
              Send H2O token
            </LoadingButton>
          ) : (
            <LoadingButton
              loading={loading['activateVendor']}
              disabled={loading['activateVendor']}
              variant="outlined"
              color="primary"
              onClick={Actions.handleActivateVendor}
            >
              Activate Vendor
            </LoadingButton>
          )}
        </>
      )}
    </div>
  );
}
