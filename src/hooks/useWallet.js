import { ethers, providers } from 'ethers';
import { useAuthContext } from 'src/auth/useAuthContext';
import useWalletConnection from './useWalletConnection';
import { getKey } from '@utils/sessionManager';
export const useWallet = (privateKey) => {
  const { isWalletConnected, library, account } = useWalletConnection();
  let { chainUrl, chainId, wallet } = useAuthContext();
  let key = getKey();
  if (!key && library) return library.getSigner();
  if (privateKey) wallet = new ethers.Wallet(privateKey);
  if (key) wallet = new ethers.Wallet(key);

  return wallet.connect(
    new providers.StaticJsonRpcProvider(chainUrl, {
      chainId,
    })
  );
};
