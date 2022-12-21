import { providers } from 'ethers';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useChainProvider = () => {
  let { chainUrl } = useAuthContext();
  return new providers.JsonRpcProvider(chainUrl);
};
