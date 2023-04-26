import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatDonor = () => {
  let { contracts, contractAddress } = useAuthContext();
  const [donorContract] = useContract(CONTRACTS.DONOR);

  const rahatTokenContract = useContract(CONTRACTS.RAHATTOKEN);
  const { handleContractError } = useErrorHandler();

  return {
    donorContract,
    rahatTokenContract,

    sendTokenToProject: (amount) =>
      donorContract?.mintTokenAndApprove(contracts[CONTRACTS.RAHATTOKEN], contractAddress, amount),
  };
};
