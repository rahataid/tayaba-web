import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { injected } from './connectors';

const useWalletConnection = () => {
  const { activate, deactivate, active, account, library, connector, error, chainId: walletChainId } = useWeb3React();
  const { chainId } = useAuthContext();

  const [isWalletConnected, setIsWalletConnected] = useState(null);
  const [walletType, setWalletType] = useState('');
  const [web3Provider, setWeb3Provider] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);

  const getAccountBalance = async () => {
    if (account && library) {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const balance = await provider.getBalance(account);
      setWalletBalance(ethers.utils.formatEther(balance));
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
      const check = async () => {
        const parsedChainId = parseInt(chainId);
        if (!isNaN(parsedChainId) && Number(walletChainId) !== parsedChainId) {
          const chainIdHex = '0x' + parsedChainId.toString(16);
          try {
            await library.provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainIdHex }],
            });
            setWeb3Provider(library);
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
            } catch (error) {
              console.log({ error });
            }
          }
        } else {
          setWeb3Provider(library.provider);
        }
      };
      check();
    }
  }, [library, chainId, walletChainId]);

  return {
    walletBalance,
    walletType,
    account,
    chainId,
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
  };
};

export default useWalletConnection;
