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

ReleaseCashButton.propTypes = {};

export default function ReleaseCashButton() {
  const { enqueueSnackbar } = useSnackbar();
  const { singleVendor, refreshData, chainData, refresh } = useVendorsContext();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const { projectBalance, addVendor, transferCashToVendor, rahatChainData, contract } = useRahat();
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
      if (!singleVendor.walletAddress) return Actions.alert('Must have vendor address', 'error');
      await addVendor(singleVendor.walletAddress);
      refreshData();
    },
    async releaseCash(amount) {
      if (!singleVendor.walletAddress) return Actions.alert('Must have vendor address', 'error');
      if (amount > rahatChainData?.cashBalance) return Actions.alert('Not enough balance to send', 'error');
      await transferCashToVendor(singleVendor.walletAddress, amount);
      refreshData();
    },
  };

  const init = useCallback(
    async (projectId) => {
      await projectBalance(projectId);
    },
    [contract]
  );

  useEffect(() => {
    if (!singleVendor?.projects?.length) return;
    init(singleVendor?.projects[0].id);
  }, [init, refresh, singleVendor]);

  return (
    <div>
      <AmountForm
        title="Release Cash to Ward"
        description={
          <>
            Please select the amount are handing over to ward for cash camp. Ward representative has to accept the cash
            before they are allowed for disburse. <br />
            <br />
            Your current cash balance is {rahatChainData?.cashBalance}
          </>
        }
        approveCashTransfer={Actions.releaseCash}
        handleClose={hideDialog}
        open={isDialogShow}
      />
      {chainData?.isActive ? (
        <Button variant="outlined" color="success" onClick={showDialog}>
          Release Cash
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={Actions.activateVendor}>
          Activate Vendor
        </Button>
      )}
    </div>
  );
}
