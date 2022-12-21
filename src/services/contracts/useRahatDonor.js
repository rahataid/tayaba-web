import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatDonor = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.DONOR);
  const cashContract = useContract(CONTRACTS.CASH);
  const { handleContractError } = useErrorHandler();

  return {
    contract,
    cashContract,

    mintTokenAndApprove: (amount) =>
      contract
        ?.mintTokenAndApprove(contracts[CONTRACTS.CASH], contracts[CONTRACTS.ADMIN], amount)
        .catch(handleContractError),
    sendCashToAgency: async (amount) => {
      try {
        let agencyAllowance = await cashContract?.allowance(contracts[CONTRACTS.DONOR], contracts[CONTRACTS.ADMIN]);
        await contract?.mintToken(contracts[CONTRACTS.CASH], amount);
        await contract?.approveToken(
          contracts[CONTRACTS.CASH],
          contracts[CONTRACTS.ADMIN],
          parseInt(agencyAllowance.toNumber()) + +amount
        );
      } catch (e) {
        handleContractError(e);
      }
    },
  };
};
