import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatToken = () => {
  let { contracts } = useAuthContext();
  const [contract] = useContract(CONTRACTS.RAHATTOKEN);
  const [contractWS] = useContract(CONTRACTS.RAHATTOKEN, { isWebsocket: true });

  const { handleContractError } = useErrorHandler();
  return {
    contract,
    contractWS,
    getAllowance: async (from, to) => (await contract.allowance(from, to))?.toNumber(),
  };
};
