import { providers } from 'ethers';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useChainProvider = () => {
  let { chainUrl, chainId } = useAuthContext();
  return new providers.StaticJsonRpcProvider(chainUrl, {
    chainId,
  });
};
