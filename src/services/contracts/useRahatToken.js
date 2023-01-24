import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatToken = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.RAHATTOKEN);
  const { handleContractError } = useErrorHandler();
  return {
    contract,

    getBudget: async () => {
      try {
        return await contract.allowance(contracts[CONTRACTS.DONOR], contracts[CONTRACTS.CVAPROJECT]);
      } catch (error) {
        handleContractError(error);
      }
    },

    claimCash: async (amount) => {
      try {
        return await contract.balanceOf(contracts[CONTRACTS.CVAPROJECT]);
      } catch (error) {
        handleContractError(error);
      }
    },
  };
};
