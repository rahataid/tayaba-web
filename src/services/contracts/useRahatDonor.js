import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatDonor = () => {
  let { contracts } = useAuthContext();
  const donorContract = useContract(CONTRACTS.DONOR);

  const rahatTokenContract = useContract(CONTRACTS.RAHATTOKEN);
  const { handleContractError } = useErrorHandler();

  return {
    donorContract,
    rahatTokenContract,

    sendCashToProject: async (amount) => {
      try {
        console.log({ donorContract });
        console.log({ amount });
        await donorContract?.mintTokenAndApprove(
          contracts[CONTRACTS.RAHATTOKEN],
          contracts[CONTRACTS.CVAPROJECT],
          amount
        );

        return await rahatTokenContract.allowance(contracts[CONTRACTS.DONOR], contracts[CONTRACTS.CVAPROJECT]);
      } catch (error) {
        handleContractError(error);
      }
    },
  };
};
