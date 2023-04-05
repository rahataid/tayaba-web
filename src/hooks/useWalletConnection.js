import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { injected } from './connectors';

const useWalletConnection = () => {
  const { activate, deactivate, active, account, library, connector, error } = useWeb3React();
  const { chainId } = useAuthContext();

  const [isWalletConnected, setIsWalletConnected] = useState(null);
  const [walletType, setWalletType] = useState('');
  const [networkId, setNetworkId] = useState(null);
  const [web3Provider, setWeb3Provider] = useState(null);

  useEffect(() => {
    if (active) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }, [active]);

  const handleWalletConnect = async (type) => {
    let connector;

    switch (type) {
      case 'MetaMask':
        connector = injected;
        break;

      default:
        connector = injected;
    }

    await activate(connector);
    setIsWalletConnected(true);
    setWalletType(type);
  };

  const connectWallet = useCallback(async (type) => {
    try {
      await handleWalletConnect(type);
      localStorage.setItem('walletType', type);
      localStorage.setItem('isWalletConnected', true);
      setIsWalletConnected(true);
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  const disconnectWallet = async () => {
    try {
      deactivate();
      setIsWalletConnected(false);
      localStorage.removeItem('walletType');
      localStorage.setItem('isWalletConnected', false);
    } catch (ex) {
      console.log(ex);
    }
  };

  const connectWalletOnPageLoad = async () => {
    const storedWalletType = localStorage.getItem('walletType');
    if (localStorage.getItem('isWalletConnected') === 'true' && storedWalletType) {
      try {
        await handleWalletConnect(storedWalletType);
      } catch (ex) {
        console.log(ex);
      }
    }
  };
  useEffect(() => {
    connectWalletOnPageLoad();
  }, [walletType, isWalletConnected]);

  useEffect(() => {
    console.log('networkId', networkId);
    const handleNetworkChange = (newNetworkId) => {
      if (newNetworkId !== networkId) {
        alert('Network changed!');
      }
    };

    const handleAccountChange = (newAccount) => {
      if (newAccount !== account) {
        alert('Account changed!');
      }
    };

    if (library) {
      console.log('library', library);
      library.eth.net.getId().then(async (id) => {
        setNetworkId(id);
        // Add logic to check if network settings are available in MetaMask
        library.eth.net.getId().then((chId) => {
          const networkSettings = parseInt(chId) === parseInt(chainId);
          if (!networkSettings) {
            // If network settings are not available, prompt user to add them
            window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  rpcUrls: [
                    'http://localhost:8545',
                    /* Array of RPC URLs for the network */
                  ],
                  chainName: 'Rahat Chain',
                  nativeCurrency: {
                    name: 'RTH',
                    symbol: 'RTH',
                    decimals: 2,
                  },
                  blockExplorerUrls: [
                    /* Block explorer URL */
                  ],
                },
              ],
            });
          }
        });

        setWeb3Provider(library.provider);
        if (library.on) {
          library.on('networkChanged', handleNetworkChange);
          library.on('accountsChanged', handleAccountChange);
        }

        return () => {
          if (library.off) {
            library.off('networkChanged', handleNetworkChange);
            library.off('accountsChanged', handleAccountChange);
          }
        };
      });
    }
  }, [library, networkId, chainId, account]);
  return {
    connectWalletOnPageLoad,
    isWalletConnected,
    walletType,
    connectWallet,
    disconnectWallet,
    account,
    chainId,
    connector,
    error,
    networkId,
    web3Provider,
  };
};

export default useWalletConnection;
