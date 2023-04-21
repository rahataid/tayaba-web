import Iconify from '@components/iconify';
import useWalletConnection from '@hooks/useWalletConnection';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';

const supportedWallets = [
  {
    name: 'MetaMask',
    icon: 'metamask',
  },
];

export default function WalletDrawer({ open, handleDrawer }) {
  const { connectWallet } = useWalletConnection();

  const toggleDrawer = () => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    handleDrawer();
  };

  const handleWalletConnect = (walletName) => () => {
    connectWallet(walletName);
    handleDrawer();
  };

  const list = () => (
    <Box sx={{ width: 350 }} role="presentation" onKeyDown={toggleDrawer()}>
      <List>
        {supportedWallets.map((wallet) => (
          <React.Fragment key={wallet.name}>
            <ListItem>
              <ListItemButton p={8} onClick={handleWalletConnect(wallet.name)}>
                <ListItemIcon>
                  <Iconify name={wallet.icon} />
                </ListItemIcon>
                <ListItemText primary={wallet.name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'wallet-select-drawer'}>
        <SwipeableDrawer anchor={'right'} open={open} onClose={toggleDrawer()} onOpen={toggleDrawer()}>
          <Box p={2} mt={2}>
            <Typography variant="subtitle1">Connect to one of these wallets.</Typography>
            {list()}
          </Box>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
