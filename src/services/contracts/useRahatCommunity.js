import { CONTRACTS } from '@config';
import { useAbi, useContract } from '@hooks/contracts';
import Web3Utils from '@utils/web3Utils';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { BrainWallet } from '@ethersproject/experimental';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { EthExplorerService } from '..';
import splitArrayToChunks from '@utils/splitArrayToChunks';
import { Contract, ethers } from 'ethers';

export const useRahatCommunity = () => {
  let { contracts, startBlockNumber, networkGasLimit } = useAuthContext();
  const contract = useContract(CONTRACTS.COMMUNITY);
  // const cvaProjectContract = useContract(CONTRACTS.CVAPROJECT);
  const contractWS = useContract(CONTRACTS.CVAPROJECT, {
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
