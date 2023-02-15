import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useErrorHandler } from '@hooks/useErrorHandler';
import Web3Utils from '@utils/web3Utils';

export const useProject = () => {
  const [contract, abi] = useContract(CONTRACTS.CVAPROJECT);
  const [h2oToken] = useContract(CONTRACTS.RAHATTOKEN);
  const [donorContract] = useContract(CONTRACTS.DONOR);
  const [communityContract, communityAbi] = useContract(CONTRACTS.COMMUNITY);
  const { handleContractError } = useErrorHandler();

  return {
    contract,
    // project functions
    h2oToken,
    communityContract,
    isProjectLocked: () => contract?.isLocked(),

    lockProject: () => donorContract?.lockProject(contract?.address).catch(handleContractError),

    unLockProject: () => donorContract?.unlockProject(contract?.address).catch(handleContractError),

    acceptToken: (amount) => contract?.acceptToken(donorContract?.address, amount).catch(handleContractError),

    getTokenAllowance: async () => (await h2oToken?.allowance(donorContract?.address, contract?.address))?.toNumber(),

    getProjectBalance: async () => (await h2oToken?.balanceOf(contract?.address))?.toNumber(),

    getVendorBalance: async (walletAddress) => (await h2oToken?.balanceOf(walletAddress))?.toNumber(),

    getVendorAllowance: async (vendorAddress) => (await contract?.vendorAllowance(vendorAddress))?.toNumber(),

    // should transfer allowances to vendor
    // transferAllowanceToVendor

    async checkActiveVendor(address) {
      const role = await communityContract?.VENDOR_ROLE();
      return communityContract?.hasRole(role, address).catch(handleContractError);
    },

    async activateVendor(address) {
      const role = await communityContract?.VENDOR_ROLE();
      return communityContract?.grantRoleWithEth(role, address).catch(handleContractError);
    },

    sendH2OWheelsToVendor(vendorAddress, amount) {
      return contract?.createAllowanceToVendor(vendorAddress, amount).catch(handleContractError);
    },

    // vendorAllowancePending
    pendingWheelsToAccept: async (vendorAddress) => (await contract?.vendorAllowancePending(vendorAddress))?.toNumber(),

    //Should accept allowance from project

    acceptH2OByVendors: (numberOfTokens) => contract?.acceptAllowanceByVendor(numberOfTokens.toString()),

    //   Beneficiaries

    checkActiveBeneficiary: (address) => communityContract?.isBeneficiary(address),

    activateBeneficiary: (address) => communityContract?.addBeneficiary(address).catch(handleContractError),

    assignClaimsToBeneficiaries: (walletAddress, amount) =>
      contract?.assignClaims(walletAddress, amount?.toString()).catch(handleContractError),

    beneficiaryBalance: async (walletAddress) => (await contract?.beneficiaryClaims(walletAddress))?.toNumber(),

    beneficiaryCounts: () => contract?.beneficiaryCount(),

    bulkActivateBeneficiaries: async (addresses) => {
      let callData = [];
      try {
        for (const address of addresses) {
          const data = Web3Utils.generateMultiCallData(communityAbi, 'addBeneficiary', [address]);
          callData.push(data);
        }
        const receipt = await Web3Utils.multicall.send(callData, communityContract);

        return receipt;
      } catch (e) {
        handleContractError(e);
      }
    },

    bulkAssignBeneficiaries: async (addresses, amount) => {
      let callData = [];

      try {
        for (const address of addresses) {
          const data = Web3Utils.generateMultiCallData(abi, 'assignClaims', [address, amount]);
          callData.push(data);
        }
        const multicall = await Web3Utils.multicall.send(callData, contract);
        return multicall;
      } catch (e) {
        handleContractError(e);
      }
    },

    bulkGetBeneficiaryClaims: async (addresses) => {
      let callData = [];

      for (const address of addresses) {
        const data = Web3Utils.generateMultiCallData(abi, 'beneficiaryClaims', [address]);
        callData.push(data);
      }
      const multicall = await Web3Utils.multicall.call(callData, contract);

      const decodedData = Web3Utils.decodeMultiCallData(abi, multicall, 'beneficiaryClaims');

      let mapped = addresses.map((address, index) => ({
        address,
        claims: decodedData[index] ? decodedData[index]?.toNumber() : 0,
      }));

      return mapped;
    },
  };
};
