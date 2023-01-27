import { CONTRACTS } from '@config';
import { useContract } from '@hooks/contracts';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { useState } from 'react';

export const useProject = () => {
  let { contracts, startBlockNumber, networkGasLimit } = useAuthContext();
  const contract = useContract(CONTRACTS.CVAPROJECT);
  const h2oToken = useContract(CONTRACTS.RAHATTOKEN);
  const donorContract = useContract(CONTRACTS.DONOR);
  const communityContract = useContract(CONTRACTS.COMMUNITY);
  const { handleContractError } = useErrorHandler();

  return {
    contract,
    // project functions
    h2oToken,
    communityContract,
    contract,
    isProjectLocked: () => contract?.isLocked(),
    lockProject: (donorWallet) => donorContract?.lockProject(contract?.address),
    unLockProject: (donorWallet) => donorContract?.unlockProject(contract?.address),
    acceptToken: (amount) => contract?.acceptToken(donorContract?.address, amount).catch(handleContractError),
    getTokenAllowance: async () => (await h2oToken?.allowance(donorContract?.address, contract?.address))?.toNumber(),

    getProjectBalance: async () => (await h2oToken?.balanceOf(contract?.address))?.toNumber(),

    // should transfer allowances to vendor
    // transferAllowanceToVendor

    async checkActiveVendor(address) {
      const role = await communityContract?.VENDOR_ROLE();
      return communityContract?.hasRole(role, address);
    },

    async activateVendor(address) {
      const role = await communityContract?.VENDOR_ROLE();
      const tx = await communityContract?.grantRole(role, address);
    },

    sendH2OWheelsToVendor(vendorAddress, amount) {
      return contract?.createAllowanceToVendor(vendorAddress, amount).catch(handleContractError);
    },

    // vendorAllowancePending
    pendingWheelsToAccept: (vendorAddress) => contract?.vendorAllowancePending(vendorAddress),

    //Should accept allowance from project

    acceptH2OByVendors: (numberOfTokens) => contract?.acceptAllowanceByVendor(numberOfTokens.toString()),

    getVendorAllowance: (vendorAddress) => contract?.vendorAllowance(vendorAddress),

    //   Beneficiaries

    checkActiveBeneficiary: (address) => communityContract?.isBeneficiary(address),

    activateBeneficiary: (address) => communityContract?.addBeneficiary(address),

    assignClaimsToBeneficiaries: (walletAddress, amount) => contract?.assignClaims(walletAddress, amount?.toString()),

    beneficiaryBalance: (walletAddress) => contract?.beneficiaryClaims(walletAddress),

    beneficiaryCounts: () => contract?.beneficiaryCount(),
  };
};
