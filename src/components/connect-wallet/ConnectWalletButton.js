import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import useWalletConnection from '@hooks/useWalletConnection';
import Iconify from '@components/iconify';
import WalletDrawer from './WalletDrawer';

const WalletIcon = <Iconify icon="material-symbols:account-balance-wallet-outline" />;

const ConnectWalletButton = () => {
  const { isWalletConnected, walletType, disconnectWallet, account } = useWalletConnection();
  console.log('account', { account, isWalletConnected, walletType });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleWalletDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <Box>
        {isWalletConnected ? (
          <Button startIcon={WalletIcon} variant="outlined" color="primary" onClick={disconnectWallet}>
            Disconnect {walletType}
          </Button>
        ) : (
          <Button startIcon={WalletIcon} variant="outlined" color="primary" onClick={handleWalletDrawer}>
            Connect Wallet
          </Button>
        )}
      </Box>

      <WalletDrawer open={drawerOpen} handleDrawer={handleWalletDrawer} />
    </>
  );
};

export default ConnectWalletButton;
