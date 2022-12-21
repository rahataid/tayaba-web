import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatCash = () => {
  let { contracts } = useAuthContext();
  const contract = useContract(CONTRACTS.CASH);
  const contractWS = useContract(CONTRACTS.CASH, { isWebsocket: true });
  const { handleContractError } = useErrorHandler();

  return {
    contract,
    contractWS,
    name: () => contract?.name().catch(handleContractError),
    symbol: () => contract?.symbol().catch(handleContractError),
    decimal: () => contract?.decimal().catch(handleContractError),
    totalSupply: () => contract?.totalSupply().catch(handleContractError),
    checkAllowance: (from, to) => contract?.allowance(from, to).catch(handleContractError),
    checkBalance: (address) => contract?.balanceOf(address).catch(handleContractError),
    getDonorBalance: () => contract?.balanceOf(contracts[CONTRACTS.DONOR]).catch(handleContractError),
    getAgencyBalance: () => contract?.balanceOf(contracts[CONTRACTS.ADMIN]).catch(handleContractError),
    getPalikaBalance: () => contract?.balanceOf(contracts[CONTRACTS.RAHAT]).catch(handleContractError),
    getAgencyAllowance: () =>
      contract?.allowance(contracts[CONTRACTS.DONOR], contracts[CONTRACTS.ADMIN]).catch(handleContractError),
    getPalikaAllowance: () =>
      contract?.allowance(contracts[CONTRACTS.ADMIN], contracts[CONTRACTS.RAHAT]).catch(handleContractError),
    getVendorAllowance: (address) =>
      contract?.allowance(contracts[CONTRACTS.RAHAT], address).catch(handleContractError),
  };
};
