import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { useBeneficiaryContext } from '@contexts/beneficiaries';
import AmountForm from '@sections/projects/cash-tracker/AmountForm';
import useDialog from '@hooks/useDialog';

ActionMenu.propTypes = {
  actionTitle: PropTypes.string,
};

export default function ActionMenu({ actionTitle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { singleBeneficiary, refreshData } = useBeneficiaryContext();
  const { enqueueSnackbar } = useSnackbar();
  const { isDialogShow, showDialog, hideDialog } = useDialog();
  const {
    push: routerPush,
    query: { beneficiaryId },
  } = useRouter();
  const open = Boolean(anchorEl);

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

    editBeneficiary() {
      Actions.alert(
        'This beneficiary is managed using Kobo Toolbox. Please contact kobo admin to update the data.',
        'warning'
      );
      setAnchorEl(null);
    },

    async issueToken(amount) {
      const project = singleBeneficiary?.projects?.[0];
      if (!project) return Actions.alert('Must have project', 'error');
      //await issueTokenToBeneficiary(project.id, singleBeneficiary.phone, amount);
      refreshData();
      setAnchorEl(null);
    },
  };

  const menuItems = [
    {
      name: 'Issue Token',
      onClick: showDialog,
    },
    {
      name: 'Edit Beneficairy',
      onClick: Actions.editBeneficiary,
    },
  ];

  return (
    <>
      <AmountForm
        title="Issue Token to Beneficiary"
        description={<>Please select the claim amount to issue to beneficiary.</>}
        approveCashTransfer={Actions.issueToken}
        handleClose={hideDialog}
        open={isDialogShow}
      />
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        variant="outlined"
        endIcon={<Iconify icon={open ? 'akar-icons:chevron-up' : 'akar-icons:chevron-down'} />}
      >
        {actionTitle}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
