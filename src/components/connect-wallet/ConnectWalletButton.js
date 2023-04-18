import Iconify from '@components/iconify';
import useWalletConnection from '@hooks/useWalletConnection';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import WalletDrawer from './WalletDrawer';

const WalletIcon = <Iconify icon="material-symbols:account-balance-wallet-outline" />;
const UnsupportedNetwork = <Iconify icon="mdi:warning-decagram-outline" />;

const ConnectToNetworkPopup = ({ open, handleClose, handleOk }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Connected to wrong network.</DialogTitle>
    <DialogContent>
      <Typography>Please connect to the correct network. You can change the network in your wallet.</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button
        startIcon={<Iconify icon="icon-park-outline:blockchain" style={{ fontSize: '1.5rem' }} />}
        variant="outlined"
        onClick={handleOk}
      >
        Switch Network
      </Button>
    </DialogActions>
  </Dialog>
);

const ConnectWalletButton = () => {
  const { isWalletConnected, library, walletType, disconnectWallet, networkId, expectedChainId, switchNetwork } =
    useWalletConnection();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isConnectedToExpectedNetwork, setConnectedToExpectedNetwork] = useState(false);
  const [openWrongNetworkModal, setOpenWrongNetworkModal] = useState(false);

  const handleWalletDrawer = () => setDrawerOpen((prev) => !prev);

  const handleWrongNetworkModal = () => {
    setOpenWrongNetworkModal((o) => !o);
  };

  useEffect(() => {
    if (library && String(networkId) !== String(expectedChainId)) {
      setConnectedToExpectedNetwork(false);
      handleWrongNetworkModal();
      // disconnectWallet();
    } else if (!networkId) {
      setConnectedToExpectedNetwork(false);
    } else {
      setConnectedToExpectedNetwork(true);
    }
  }, [expectedChainId, networkId]);

  return (
    <>
      <ConnectToNetworkPopup
        open={openWrongNetworkModal}
        handleClose={handleWrongNetworkModal}
        handleOk={switchNetwork}
      />
      <Box>
        {isWalletConnected ? (
          <Button
            startIcon={isConnectedToExpectedNetwork ? WalletIcon : UnsupportedNetwork}
            variant="outlined"
            color="primary"
            onClick={disconnectWallet}
          >
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
