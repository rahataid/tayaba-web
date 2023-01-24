import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatAdmin = () => {
  let { contracts } = useAuthContext();
  const adminContract = useContract(CONTRACTS.ADMIN);
  const cvaContract = useContract(CONTRACTS.CVAPROJECT);
  const rahatTokenContract = useContract(CONTRACTS.RAHATTOKEN);
  const [agencyChainData, setAgencyChainData] = useState({});
  const { handleContractError } = useErrorHandler();
  return {
    adminContract,
    agencyChainData,
    rahatTokenContract,
    cvaContract,
    sendToPalika: (projectId, amount) =>
      adminContract?.setProjectBudget_ERC20(contracts[CONTRACTS.RAHAT], projectId, amount).catch(handleContractError),

    getBudget: async () => {
      try {
        return await rahatTokenContract.allowance(contracts[CONTRACTS.DONOR], contracts[CONTRACTS.CVAPROJECT]);
      } catch (error) {
        handleContractError(error);
      }
    },

    claimCash: async (amount) => {
      try {
        await adminContract?.acceptToken(contracts[CONTRACTS.RAHATTOKEN], contracts[CONTRACTS.CVAPROJECT], amount);
        return await rahatTokenContract.balanceOf(contracts[CONTRACTS.CVAPROJECT]);
      } catch (error) {
        handleContractError(error);
      }
    },
  };
};
