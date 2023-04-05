import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useAuthContext } from 'src/auth/useAuthContext';

export const useRahatCommunity = () => {
  let { contracts, startBlockNumber, networkGasLimit } = useAuthContext();
  const [contract] = useContract(CONTRACTS.COMMUNITY);
  // const cvaProjectContract = useContract(CONTRACTS.CVAPROJECT);
  const [contractWS] = useContract(CONTRACTS.CVAPROJECT, {
    isWebsocket: true,
  });
  const { handleError, handleContractError } = useErrorHandler();

  const vendorRoles = () => contract?.VENDOR_ROLE().catch(handleContractError);

  const checkIfBeneficiary = (walletAddress) => contract?.isBeneficiary(walletAddress);

  const addBeneficiaryToCommunity = (walletAddress) => contract?.addBeneficiary(walletAddress);

  return {
    contract,
    vendorRoles,
    checkIfBeneficiary,
    addBeneficiaryToCommunity,
    communityName: () => contract?.name().catch(handleContractError),

    addVendorToCommunity: (vendorAddress) => {
      const vendorHasRole = contract?.hasRole(vendorRoles(), vendorAddress);

      if (vendorHasRole) return new Error('Vendor Has already been added');

      return vendorHasRole ? contract?.grantRole(vendorRoles(), vendorAddress).catch(handleContractError) : null;
    },
  };
};
