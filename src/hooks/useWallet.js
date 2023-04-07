import ethers, { providers } from 'ethers';
import { useAuthContext } from 'src/auth/useAuthContext';
import useWalletConnection from './useWalletConnection';
export const useWallet = (privateKey) => {
  const { isWalletConnected, library, account } = useWalletConnection();
  let { chainUrl, chainId, wallet } = useAuthContext();

  if (isWalletConnected && account) return library.getSigner();

  if (privateKey) wallet = new ethers.Wallet(privateKey);
  return wallet.connect(
    new providers.StaticJsonRpcProvider(chainUrl, {
      chainId,
    })
  );
};
