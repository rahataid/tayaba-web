import ethers, { providers } from 'ethers';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useWallet = (privateKey) => {
  let { chainUrl, chainId, wallet } = useAuthContext();
  if (privateKey) wallet = new ethers.Wallet(privateKey);

  return wallet.connect(
    new providers.StaticJsonRpcProvider(chainUrl, {
      chainId,
    })
  );
};
