import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import { useVendorsContext } from '@contexts/vendors';
import { useSnackbar } from 'notistack';
import { Divider, Grid } from '@mui/material';
import ReleaseCashButton from './ReleaseCashButton';
import { Stack } from '@mui/system';
import { useErrorHandler } from '@hooks/useErrorHandler';

ActionMenu.propTypes = {
  actionTitle: PropTypes.string,
};

export default function ActionMenu({ actionTitle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { singleVendor, refreshData, chainData } = useVendorsContext();
  const { handleError } = useErrorHandler();
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
    async ActivateVendor() {
      // if (!singleVendor.walletAddress) return Actions.alert('Must have walletAddress', 'error');
      // await addVendor(singleVendor.walletAddress);
      // await VendorService.updateVendorApprovalStatus(singleVendor.id, true);
      // setAnchorEl(null);
      // refreshData();
    },
    async DeactivateVendor() {
      // console.log('singleVendor', singleVendor);
      // if (!singleVendor.walletAddress) return Actions.alert('Must have walletAddress', 'error');
      // await removeVendor(singleVendor.walletAddress);
      // await VendorService.updateVendorApprovalStatus(singleVendor.id, false);
      // setAnchorEl(null);
      // refreshData();
    },

    async acceptCashForVendor() {
      // if (!singleVendor.walletAddress) return Actions.alert('Must have walletAddress', 'error');
      // await acceptCashForVendor(singleVendor.walletAddress, chainData.cashAllowance);
      // setAnchorEl(null);
      // refreshData();
    },
  };

  const menuItems = [
    {
      name: `Activate Vendor`,
      onClick: Actions.ActivateVendor,
    },

    '-',
    {
      name: 'Accept Cash',
      onClick: Actions.acceptCashForVendor,
    },
  ];

  return (
    <div>
      <Stack sx={{ ml: -10 }} direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <ReleaseCashButton />
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
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {menuItems.map((item, index) => {
          if (item === '-') return <Divider />;
          else
            return (
              <MenuItem key={index} onClick={item.onClick}>
                {item.name}
              </MenuItem>
            );
        })}
      </Menu>
    </div>
  );
}
