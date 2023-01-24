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

  const { handleContractError } = useErrorHandler();

  const isProjectLocked = () => contract?.isLocked();

  return {
    contract,
    // project functions
    isProjectLocked,
    h2oToken,
    acceptToken: (amount) => contract?.acceptToken(donorContract?.address, amount).catch(handleContractError),
    getTokenAllowance: async () => (await h2oToken?.allowance(donorContract?.address, contract?.address))?.toNumber(),

    getProjectBalance: async () => (await h2oToken?.balanceOf(contract?.address))?.toNumber(),

    lockProject: (address) => {
      if (!isProjectLocked) {
        return donorContract?.lockProject(address);
      }
    },

    // should transfer allowances to vendor
    // transferAllowanceToVendor
    sendH2OWheelsToVendor(vendorAddress, amount) {
      return contract?.createAllowanceToVendor(vendorAddress, amount).catch(handleContractError);
    },

    // vendorAllowancePending
    pendingWheelsToAccept: (vendorAddress) => contract?.vendorAllowancePending(vendorAddress),

    //Should accept allowance from project

    acceptH2OByVendors: (numberOfTokens) => contract?.acceptAllowanceByVendor(numberOfTokens.toString()),

    getVendorAllowance: (vendorAddress) => contract?.vendorAllowance(vendorAddress),

    //   Beneficiaries

    assignClaimsToBeneficiaries: (walletAddress, amount) => contract?.assignClaims(walletAddress, amount?.toString()),

    beneficiaryBalance: (walletAddress) => contract?.beneficiaryClaims(walletAddress),

    beneficiaryCounts: () => contract?.beneficiaryCount(),
  };
};
