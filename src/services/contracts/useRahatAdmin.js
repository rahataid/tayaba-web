import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import Web3Utils from '@utils/web3Utils';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatAdmin = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.ADMIN);
  const rahatContract = useContract(CONTRACTS.RAHAT);

  const [agencyChainData, setAgencyChainData] = useState({});
  const { handleContractError } = useErrorHandler();

  return {
    contract,
    agencyChainData,

    sendToPalika: (projectId, amount) =>
      contract?.setProjectBudget_ERC20(contracts[CONTRACTS.RAHAT], projectId, amount).catch(handleContractError),

    getAllowanceAndBalance: (erc20Address) =>
      contract
        ?.getAllowanceAndBalance(erc20Address || contracts[CONTRACTS.CASH], contracts[CONTRACTS.DONOR])
        .then((agencyBalanceData) => {
          const data = {
            cashAllowance: agencyBalanceData?.allowance?.toNumber(),
            cashBalance: agencyBalanceData?.balance?.toNumber(),
          };
          setAgencyChainData((d) => ({
            ...d,
            ...data,
          }));
          return data;
        })
        .catch(handleContractError),

    async claimCash(amount) {
      await contract?.acceptToken(contracts[CONTRACTS.RAHAT], contracts[CONTRACTS.DONOR], amount);
      return await rahatContract.balanceOf(contracts[CONTRACTS.CVAPROJECT]);
    },
  };
};
