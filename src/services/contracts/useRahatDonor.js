import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatDonor = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.DONOR);
  const rahatContract = useContract(CONTRACTS.RAHAT);
  const { handleContractError } = useErrorHandler();

  return {
    contract,
    cashContract,

    createToken: async (tokenInfo) => {
      try {
        await contract?.createToken(tokenInfo.name, tokenInfo.symbol, tokenInfo.symbol);
        const tokens = await contract.listTokens();
        tokenAddress = tokens[0];
        const TokenContract = await ethers.getContractFactory('RahatToken');
        return await TokenContract.attach(tokenAddress);
      } catch (e) {
        handleContractError(e);
      }
    },
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
    sendCashToProject: async ( amount) => {
      try {
        contract?.mintTokenAndApprove(contracts[CONTRACTS.RAHAT], contracts[CONTRACTS.CVAPROJECT], amount);
        return await token.allowance(contract, contracts[CONTRACTS.CVAPROJECT]);
      } catch (error) {
        handleContractError(error);
      }
    },
  };
};
