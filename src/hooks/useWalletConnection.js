import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { injected } from './connectors';
import { useErrorHandler } from './useErrorHandler';
import { clearStorage, getKey } from '@utils/sessionManager';

const useWalletConnection = () => {
  const {
    activate,
    deactivate,
    active,
    account,
    library,
    connector,
    error,
    chainId: walletChainId,
    setError,
  } = useWeb3React();
  const { chainId, logout } = useAuthContext();
  const { showError } = useErrorHandler();

  const [isWalletConnected, setIsWalletConnected] = useState(null);
  const [walletType, setWalletType] = useState('');
  const [web3Provider, setWeb3Provider] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);

  const getAccountBalance = async () => {
    try {
      if (account && library) {
        const provider = new ethers.providers.Web3Provider(library.provider);
        const balance = await provider.getBalance(account);
        setWalletBalance(ethers.utils.formatEther(balance));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const estimateGas = async (byteCode) => {
    const signer = library.getSigner();
    const signerAddress = await signer.getAddress();
    const estimatedCostHex = await library?.estimateGas({
      from: signerAddress,
      data: byteCode,
    });
    const estimatedCost = estimatedCostHex?.toNumber();

    const costInEthers = ethers.utils.formatEther(estimatedCost);

    const hasEnoughBalance = +walletBalance >= +costInEthers;

    return {
      hasEnoughBalance,
      costInEthers,
      estimatedCost,
      walletBalance,
    };
  };

  useEffect(() => {
    if (account) {
      getAccountBalance();
    }
  }, [account]);

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

  window.ethereum.on('accountsChanged', (accounts) => {
    if (!getKey()) {
      disconnectWallet();
    }
  });

  const disconnectWallet = async () => {
    try {
      deactivate();
      setIsWalletConnected(false);
      localStorage.removeItem('walletType');
      localStorage.setItem('isWalletConnected', false);
      if (!getKey()) {
        logout();
        clearStorage();
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const connectWalletOnPageLoad = async () => {
    const storedWalletType = localStorage.getItem('walletType');
    if (localStorage.getItem('isWalletConnected') === 'true' && storedWalletType) {
      try {
        await handleWalletConnect(storedWalletType);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const showErrorMessage = useCallback(() => {
    if (!error) return;
    let msg = error?.message || 'Wallet connection error';
    const code = error?.code || 0;
    const errors = {
      '-32002': {
        message: 'Please connect to the correct network',
      },
    };
    if (code && errors[code]) {
      msg = errors[code].message;
    }

    showError(msg);

    console.log('error', error);
  }, [error]);

  useEffect(() => {
    showErrorMessage();
  }, [showErrorMessage]);

  useEffect(() => {
    connectWalletOnPageLoad().catch((err) => setError(err.message));
  }, [walletType, isWalletConnected]);

  const switchNetwork = useCallback(async () => {
    const parsedChainId = parseInt(chainId);
    if (!isNaN(parsedChainId) && Number(walletChainId) !== parsedChainId) {
      const chainIdHex = '0x' + parsedChainId.toString(16);
      try {
        await library.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }],
        });
        setWeb3Provider(library);
        return;
      } catch (error) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdHex,
                chainName: 'Local Ganache',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['http://localhost:8545/'],
                blockExplorerUrls: ['https://example.com/'],
              },
            ],
          });
          setWeb3Provider(library);
          return;
        } catch (error) {
          setError(error);
          console.log({ error });
        }
      }
    }
  }, [library, chainId]);

  useEffect(() => {
    // console if network changes
    if (library && active) {
      library.on('chainChanged', (chainId) => {
        console.log('chainChangedTHis is ', chainId);
      });
    }
  }, [library, active]);

  useEffect(() => {
    if (localStorage.getItem('isWalletConnected') === false || getKey() || active || library) return;
    const disconnect = setTimeout(async () => {
      await disconnectWallet();
    }, 2000);
    return () => clearTimeout(disconnect);
  }, [library, active]);

  useEffect(() => {}, []);

  const signMessage = async (message) => {
    if (!account) await connectWallet();
    if (!library) throw Error('Wallet Not connected');
    let signer = library.getSigner();
    return signer.signMessage(message);
  };

  return {
    walletBalance,
    walletType,
    account,
    expectedChainId: chainId,
    error,
    networkId: walletChainId,
    connectWalletOnPageLoad,
    isWalletConnected,
    connectWallet,
    disconnectWallet,
    connector,
    web3Provider,
    library,
    estimateGas,
    switchNetwork,
    signMessage,
  };
};

export default useWalletConnection;
