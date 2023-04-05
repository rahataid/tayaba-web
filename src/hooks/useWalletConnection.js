import { BLOCKCHAIN_NETWORKS } from '@config';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
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
    if (library) {
      library.getNetwork().then(async (network) => {
        setNetworkId(network.chainId);
        if (Number(network.chainId) !== Number(chainId)) {
          try {
            const chainIdHex = '0x' + Number(chainId).toString(16);
            await library.send('wallet_switchEthereumChain', [{ chainId: chainIdHex }]);
            const { Url } = BLOCKCHAIN_NETWORKS[chainId];
            const provider = new providers.JsonRpcProvider(Url);
            console.log({ provider });
            setWeb3Provider(provider);
          } catch (error) {
            console.log({ error });
          }

          return;
        }
        setWeb3Provider(library.provider);
      });
    }
  }, [library, chainId]);

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
