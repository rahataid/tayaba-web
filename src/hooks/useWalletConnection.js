import { useState, useEffect, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from './connectors';
import Web3Utils from '@utils/web3Utils';
import { NETWORK_GAS_LIMIT } from '@config';


const useWalletConnection = () => {
  const { activate, deactivate, active, account, library, chainId, connector, error } = useWeb3React();
  const [isWalletConnected, setIsWalletConnected] = useState(null);
  const [walletType, setWalletType] = useState('');
  const [networkId, setNetworkId] = useState(null);
  const [web3Provider, setWeb3Provider] = useState(null);  

  useEffect(() => {
    if (active) {
      setIsWalletConnected(true);
    }else{
      setIsWalletConnected(false);
    }
  }, [active]);

  const getBalance = useCallback(async() => {
    if(!account) return;

    const balanceInWei = await library.eth.getBalance(account);
    const balance = Web3Utils.weiToEth(balanceInWei.toString()) || null;
    const gasLimit = Web3Utils.weiToEth(NETWORK_GAS_LIMIT.toString()) || null;
    const hasEnoughBalance = +balance >= +gasLimit || null;
    const requiredBalance = NETWORK_GAS_LIMIT - balance || null; 

    return {balance, hasEnoughBalance, requiredBalance, gasLimit, networkGasLimit: NETWORK_GAS_LIMIT};

  },[library, account]);

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
      setIsWalletConnected(true)
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
  }, [walletType,isWalletConnected]);

  useEffect(() => {
    if (library) {
      library.eth.net.getId().then(setNetworkId);
      setWeb3Provider(library.provider);
    }
  }, [library]);


  return {
    connectWalletOnPageLoad,
    isWalletConnected,
    walletType,
    connectWallet,
    disconnectWallet,
    getBalance,
    account,
    chainId,
    connector,
    error,
    networkId,
    web3Provider,
  };
};

export default useWalletConnection;
