import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Stack, Typography, Button } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import ActionMenu from './ActionMenu';
import TransferTokenDialog from '../cash-tracker/TransferTokenDialog';
import CreateTokenDialog from '../cash-tracker/CreateTokenDialog';
import { useRahatDonor } from '@services/contracts/useRahatDonor';
import { useRahatAdmin } from '@services/contracts/useRahatAdmin';
import { useRouter } from 'next/router';
import useDialog from '@hooks/useDialog';
import AmountForm from '../cash-tracker/AmountForm';
import useLoading from '@hooks/useLoading';

const TitleCard = (props) => {
  const { singleProject } = useProjectContext();
  const { agencyChainData } = useRahatAdmin();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const {
    push,
    query: { projectId },
  } = useRouter();
  const [createTokenDialog, setCreateTokenDialog] = useState(false);
  const [transferTokenDialog, setTransferTokenDialog] = useState(false);
  const { sendCashToAgency } = useRahatDonor();
  const { loading, showLoading, hideLoading } = useLoading();

  const handleClose = () => {
    setTransferTokenDialog(false);
    setCreateTokenDialog(false);
    hideDialog();
  };

  const handleCreateTokenModal = () => {
    setCreateTokenDialog((prev) => !prev);
  };

  const handleTransferTokenModal = () => {
    setTransferTokenDialog((prev) => !prev);
  };
  const handleAddBudgetModel = () => {
    showDialog();
  };

  const CashActions = {
    async sendCashToAgency(amount) {
      showLoading('cashTransfer');
      await sendCashToAgency(amount);
      refreshData();
      hideLoading('cashTransfer');
    },
  };

  const handleBeneficiaryRouteAction = () => {
    push(`/projects/${projectId}/beneficiaries`);
  };

  const menuItems = [
    // {
    //   onClick: handleTransferTokenModal,
    //   name: 'Transfer Token',
    // },
    // {
    //   onClick: handleCreateTokenModal,
    //   name: 'Create Token',
    // },
    {
      onClick: handleAddBudgetModel,
      name: 'Add Budget',
    },
  ];
  return (
    <>
      <TransferTokenDialog
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
      />
      <CreateTokenDialog
        description={
          <>
            Please enter No. of token you wish to Create <br />
            <br />
            Your have total {agencyChainData?.cashBalance} tokens
          </>
        }
        cashBalance={0}
        handleClose={handleClose}
        open={createTokenDialog}
      />
      <AmountForm
        title="Add Budget in Project"
        description={<>Please enter the budget you wish to add to project</>}
        approveCashTransfer={CashActions.sendCashToAgency}
        handleClose={hideDialog}
        open={isDialogShow}
      />
      <Grid item xs={12} md={12}>
        <Card variant="outlined">
          <Stack sx={{ p: 1 }} direction="row" justifyContent="space-between" alignItems="center">
            <Button variant="text" onClick={handleBeneficiaryRouteAction}>
              {' '}
              Beneficiaries
            </Button>
            <ActionMenu menuItems={menuItems} actionTitle="Actions" />
          </Stack>
        </Card>
      </Grid>
    </>
  );
};

export default TitleCard;
