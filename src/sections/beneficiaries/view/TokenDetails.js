/* eslint-disable react-hooks/exhaustive-deps */
import LoadingOverlay from '@components/LoadingOverlay';
import WalletExplorerButton from '@components/button/WalletExplorerButton';
import { SPACING } from '@config';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import useDialog from '@hooks/useDialog';
import useLoading from '@hooks/useLoading';
import { Button, Card, CardContent, Dialog, DialogActions, DialogTitle, Grid, Stack, Typography } from '@mui/material';
import { useProject } from '@services/contracts/useProject';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import AssignProjectModal from './AssignProjectModal';

TokenDetails.propTypes = {};
export default function TokenDetails({ chainData }) {
  const { singleBeneficiary, refreshData, projects, getAllProjects, assignProject } = useBeneficiaryContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { assignClaimsToBeneficiaries, contract } = useProject();
  const { loading, showLoading, hideLoading } = useLoading();
  const { roles } = useAuthContext();
  const { activateBeneficiary } = useProject();
  const [showProjectAssign, setShowProjectAssign] = useState(false);

  const handleAssignProject = () => {
    setShowProjectAssign(true);
  };
  const handleAssignProjectClose = () => {
    setShowProjectAssign(false);
  };

  const handleAssignClaim = async () => {
    showLoading('assignClaim');
    assignClaimsToBeneficiaries(singleBeneficiary?.data?.walletAddress, 1)
      .then(async (res) => {
        // const txn = {
        //   txHash: res?.hash,
        //   contractAddress: contract?.address,
        //   timestamp: Math.floor(Date.now() / 1000),
        //   beneficiaryId: singleBeneficiary?.data?.id,
        //   vendorId: singleBeneficiary?.data?.vendor?.id || 1,
        //   projectId: singleBeneficiary?.data?.beneficiary_project_details[0].id || 1,
        //   amount: 1,
        //   isOffline: false,
        //   txType: 'wallet',
        // };
        // await TransactionService.addTransactionData(txn);
        hideDialog();
        hideLoading('assignClaim');
        refreshData();
      })
      .catch((err) => {
        hideDialog();
        hideLoading('assignClaim');
      });
  };

  const handleActivate = async () => {
    activateBeneficiary(singleBeneficiary?.data?.walletAddress).then(() => {
      refreshData();
    });
  };

  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);
  return (
    <Card sx={{ width: '100%', mb: SPACING.GRID_SPACING }}>
      <Dialog open={isDialogShow} onClose={hideDialog}>
        <LoadingOverlay open={loading.assignClaim}>
          <DialogTitle> Are you sure to assign claim ?</DialogTitle>
          <DialogActions>
            <Button onClick={hideDialog}>Cancel</Button>
            <Button variant="outlined" onClick={handleAssignClaim}>
              Assign
            </Button>
          </DialogActions>
        </LoadingOverlay>
      </Dialog>
      <AssignProjectModal
        open={showProjectAssign}
        handleClose={handleAssignProjectClose}
        projects={projects}
        assignProject={assignProject}
        beneficraryId={singleBeneficiary?.data?.id}
      />

      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Typography>Claims Details</Typography>
          {singleBeneficiary?.data?.beneficiary_project_details.length === 0 ? (
            <Button variant="outlined" onClick={handleAssignProject} size="small">
              Assign Project
            </Button>
          ) : (
            <>
              {chainData?.isBenActive ? (
                <>
                  {(roles.isManager || roles.isAdmin) && (
                    <>
                      {chainData?.balance < 1 ? (
                        <Button variant="outlined" onClick={showDialog} size="small">
                          {' '}
                          Assign Claim
                        </Button>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {roles.isAdmin && (
                    <Button
                      variant="outlined"
                      onClick={handleActivate}
                      disabled={roles?.isDonor ? true : false}
                      size="small"
                    >
                      {' '}
                      Activate
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </Stack>
        <Stack
          sx={{ pt: SPACING.GRID_SPACING }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Typography variant="caption">Claimed</Typography>

          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="caption">{moment().format('DD/MMM/YYYY')}</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="caption">{chainData?.balance || 0}</Typography>
          </Grid>
        </Stack>

        <Stack
          sx={{ pt: SPACING.GRID_SPACING }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Typography variant="caption">Received</Typography>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="caption">{moment().format('DD/MMM/YYYY')}</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="caption">{chainData?.totalTokenIssued || 0}</Typography>
          </Grid>
        </Stack>
        <Stack
          sx={{ pt: SPACING.GRID_SPACING, overflow: 'elipsis' }}
          direction="row"
          // justifyContent="space-between"
          justifyContent={'flex-start'}
          alignItems="center"
          spacing={SPACING.GRID_SPACING}
        >
          <Typography variant="caption">Wallet</Typography>

          <WalletExplorerButton address={singleBeneficiary?.data?.walletAddress} type="address" truncateLength={8} />
        </Stack>
      </CardContent>
    </Card>
  );
}
