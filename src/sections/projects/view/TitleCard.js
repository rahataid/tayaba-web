import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography, Button, Alert } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import ActionMenu from './ActionMenu';
import TransferTokenDialog from '../cash-tracker/TransferTokenDialog';
import CreateTokenDialog from '../cash-tracker/CreateTokenDialog';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import AmountForm from '../cash-tracker/AmountForm';
import useLoading from '@hooks/useLoading';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'notistack';
import LoadingOverlay from '@components/LoadingOverlay';

const TitleCard = ({}) => {
  const { singleProject } = useProjectContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { roles } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const {
    push,
    query: { projectId },
  } = useRouter();
  const [assignTokenDialog, setAssignTokenDialog] = useState(false);
  const { sendCashToProject } = useRahatDonor();
  const { loading, showLoading, hideLoading } = useLoading();

  const handleClose = () => {
    setAssignTokenDialog(false);
    hideDialog();
  };

  const handleAssignTokenModal = () => {
    setAssignTokenDialog((prev) => !prev);
  };

  const handleAddBudgetModel = () => {
    showDialog();
  };

  const CashActions = {
    async sendCashToProject(amount) {
      showLoading('cashTransfer');
      await sendCashToProject(amount);
      hideLoading('cashTransfer');
      enqueueSnackbar('Added Budget to Project');
    },
  };

  const handleBeneficiaryRouteAction = () => {
    push(`/projects/${projectId}/beneficiaries`);
  };

  const menuItems = [
    {
      onClick: handleAssignTokenModal,
      name: 'Assign Token',
      show: roles?.isAdmin,
    },
    {
      onClick: handleAddBudgetModel,
      name: 'Add Budget',
      show: roles.isDonor,
    },
  ];
  return (
    <>
      {/* <TransferTokenDialog
        description={
          <>
            Please enter No. of token you wish to transfer . Receiver has to accept the token before it is fully
            transferred and allowed for disbursement. <br />
            <br />
            Your remaining token are {agencyChainData?.token}
          </>
        }
        cashBalance={0}
        handleClose={handleClose}
        open={transferTokenDialog}
      /> */}
      <CreateTokenDialog
        description={
          <>
            Please enter No. of token you wish to Create <br />
            <br />
            Your have total #NA tokens
          </>
        }
        cashBalance={0}
        handleClose={handleClose}
        open={assignTokenDialog}
      />
      <AmountForm
        title="Add Budget in Project"
        description={<>Please enter the budget you wish to add to project</>}
        approveCashTransfer={CashActions?.sendCashToProject}
        handleClose={hideDialog}
        open={isDialogShow}
      />

      <Grid item xs={12} md={12}>
        <LoadingOverlay open={loading?.cashTransfer}>
          <Card variant="outlined">
            <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center">
              <Button variant="outlined" onClick={handleBeneficiaryRouteAction}>
                {' '}
                Beneficiary List{' '}
              </Button>
              <ActionMenu menuItems={menuItems} actionTitle="Actions" />
            </Stack>
          </Card>
        </LoadingOverlay>
      </Grid>
    </>
  );
};

export default TitleCard;
