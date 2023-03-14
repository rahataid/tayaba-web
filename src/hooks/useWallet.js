import ethers, { providers } from 'ethers';
import { useAuthContext } from 'src/auth/useAuthContext';
import useWalletConnection from './useWalletConnection';

export const useWallet = (privateKey) => {
  const { isWalletConnected, library } = useWalletConnection();
  let { chainUrl, chainId, wallet } = useAuthContext();

  if (privateKey) wallet = new ethers.Wallet(privateKey);

  if (isWalletConnected) {
    return wallet.connect(library);
  }

  console.log('wallet', wallet);

  return wallet.connect(
    new providers.StaticJsonRpcProvider(chainUrl, {
      chainId,
    })
  );
};
