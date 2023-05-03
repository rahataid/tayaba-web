import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import WalletExplorerButton from '@components/button/WalletExplorerButton';
import { APP_NAME } from '@config';
import useWalletConnection from '@hooks/useWalletConnection';
import controllers from '@utils/indexdb';
import { IconButtonAnimate } from '../../../components/animate';
import { CustomAvatar } from '../../../components/custom-avatar';
import MenuPopover from '../../../components/menu-popover';
import { useSnackbar } from '../../../components/snackbar';
import { getKey } from '@utils/sessionManager';

// ----------------------------------------------------------------------

const OPTIONS = [
  // {
  //   label: 'Home',
  //   linkTo: '/',
  // },
  // {
  //   label: 'Profile',
  //   linkTo: '/',
  // },
  // {
  //   label: 'Settings',
  //   onClick: () => {
  //     console.log('settings drawer');
  //   },
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { replace, push } = useRouter();

  const { user, wallet, logout } = useAuthContext();
  const { account } = useWalletConnection();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      controllers.clear();
      replace(PATH_AUTH.login);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    push(path);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar src={user?.photoURL} alt={user?.name} name={user?.name || APP_NAME} />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }} noWrap>
            {user?.email}
          </Typography>

          {getKey() ? (
            <WalletExplorerButton copyButton={false} address={wallet.address} type="address" truncateLength={6} />
          ) : (
            <WalletExplorerButton copyButton={false} address={account} type="address" truncateLength={6} />
          )}
        </Box>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <Stack sx={{ p: 0 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)} {...option}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1, color: 'red' }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
