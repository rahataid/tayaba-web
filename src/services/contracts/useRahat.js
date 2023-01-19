import { CONTRACTS } from '@config';
import { useAbi, useContract } from '@hooks/contracts';
import Web3Utils from '@utils/web3Utils';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { BrainWallet } from '@ethersproject/experimental';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { EthExplorerService } from '..';
import splitArrayToChunks from '@utils/splitArrayToChunks';
import { ethers } from 'ethers';

export const useRahat = () => {
  let { contracts, startBlockNumber, networkGasLimit } = useAuthContext();
  const contract = useContract(CONTRACTS.RAHAT);
  const contractWS = useContract(CONTRACTS.RAHAT, { isWebsocket: true });
  const cashContract = useContract(CONTRACTS.CASH);
  const registryContract = useContract(CONTRACTS.REGISTRY);
  const rahatAbi = useAbi(CONTRACTS.RAHAT);
  const [rahatChainData, setRahatChainData] = useState({});
  const [vendorData, setVendorData] = useState({});
  const [claimLogs, setClaimLogs] = useState([]);
  const [beneficiaryData, setBeneficiaryData] = useState({ walletAddress: '0' });
  const { handleContractError } = useErrorHandler();

  const getLogs = async (eventName, topics) => {
    if (!contract?.address) return [];
    const response = await EthExplorerService.getLogs({
      fromBlock: startBlockNumber,
      address: contract?.address, //'0x86EcDd932f5FE35D18a7D7b3C5095582340915A0',
      topic0: eventName,
      ...topics,
    });

    let logData = response?.result?.map((d) => {
      const _topics = d.topics.filter((d) => d !== null);
      let log = contract?.interface.parseLog({
        data: d.data,
        topics: _topics,
      });
      return {
        blockNumber: d.blockNumber,
        txHash: d.transactionHash,
        timestamp: parseInt(d.timeStamp),
        vendor: log.args.vendor,
        amount: log.args.amount?.toNumber(),
        beneficiary: log.args.beneficiary.toNumber(), //test
      };
    });

    // let data = (await contract?.queryFilter(eventName, startBlockNumber, 'latest'))?.map((d) => ({
    //   txHash: d.transactionHash,
    //   vendor: d.args.vendor,
    //   beneficiary: d.args.beneficiary?.toNumber(),
    //   amount: d.args.amount?.toNumber(),
    // }));
    setClaimLogs(logData);
    return logData;
  };

  return {
    contract,
    contractWS,
    cashContract,
    rahatChainData,
    vendorData,
    beneficiaryData,
    claimLogs,
    getLogs,

    //Vendor functions
    isVendor: (vendorAddress) => contract?.isVendor(vendorAddress).catch(handleContractError),
    addVendor: (vendorAddress) => contract?.addVendor(vendorAddress).catch(handleContractError),
    removeVendor: (vendorAddress) =>
      contract?.revokeRole(Web3Utils.keccak256('VENDOR'), vendorAddress).catch(handleContractError),
    listVendors: () => contract?.listVendors().catch(handleContractError),

    //Beneficiary functions
    suspendBeneficiary: (phone, projectId) =>
      contract?.suspendBeneficiary(phone, Web3Utils.keccak256(projectId)).catch(handleContractError),
    setAsBankedBeneficiary: (phone, isBanked) =>
      contract?.setAsBankedBeneficiary(phone, isBanked).catch(handleContractError),

    async issueTokenToBeneficiary(projectId, phone, amount) {
      try {
        const benId = Web3Utils.keccak256(phone.toString());
        const key = Web3Utils.keccak256('9670');
        const benExists = await registryContract?.exists(benId);
        if (!benExists) {
          const benWallet = await BrainWallet.generate(
            benId,
            key
            //, (p) => console.info('Completed: ' + Math.trunc(100 * p) + '%')
          );
          await registryContract?.addId2AddressMap(benId, benWallet.address);
        }
        await contract?.issueERC20ToBeneficiary(projectId, phone, amount);
      } catch (e) {
        handleContractError(e);
      }
    },

    async claimTokenForProject(projectId, amount) {
      projectId = Web3Utils.keccak256(projectId);
      await contract?.claimTokenForProject(contracts[CONTRACTS.CASH], contracts[CONTRACTS.ADMIN], projectId, amount);
    },

    transferCashToVendor: (vendorAddress, amount) =>
      contract?.transferCashToVendor(vendorAddress, amount).catch(handleContractError),

    acceptCashForVendor: (vendorAddress, amount) =>
      contract?.acceptCashForVendor(vendorAddress, amount).catch(handleContractError),

    async projectBalance(projectId) {
      projectId = Web3Utils.keccak256(projectId);
      try {
        const projectBalanceData = await contract?.projectBalance(projectId, contracts[CONTRACTS.ADMIN]);
        const cashAllowance = await cashContract?.allowance(contracts[CONTRACTS.ADMIN], contracts[CONTRACTS.RAHAT]);
        const data = {
          totalBudget: projectBalanceData?.totalBudget?.toNumber(),
          tokenBalance: projectBalanceData?.tokenBalance?.toNumber(),
          cashBalance: projectBalanceData?.cashBalance?.toNumber(),
          cashAllowance: cashAllowance?.toNumber(),
        };
        setRahatChainData((d) => ({
          ...d,
          ...data,
        }));
        return data;
      } catch (e) {
        handleContractError(e);
      }
    },

    async vendorBalance(vendorAddress) {
      try {
        const vendorBalanceData = await contract?.vendorBalance(vendorAddress);
        const data = {
          walletAddress: vendorBalanceData?.walletAddress,
          cashAllowance: vendorBalanceData?.cashAllowance?.toNumber(),
          cashBalance: vendorBalanceData?.cashBalance?.toNumber(),
          tokenBalance: vendorBalanceData?.tokenBalance?.toNumber(),
          isActive: vendorBalanceData?.hasVendorRole,
        };
        setVendorData((d) => ({
          ...d,
          ...data,
        }));
        return data;
      } catch (e) {
        handleContractError(e);
      }
    },

    async vendorsBalance(vendorAddresses) {
      try {
        const callData = vendorAddresses.map(async (vAddr) =>
          contract?.interface.encodeFunctionData('vendorBalance', [vAddr])
        );
        const balance = await contract?.callStatic.multicall(callData);
        const decodedData = balance?.map((vendorId) => {
          const { cashAllowance, cashBalance, hasVendorRole, tokenBalance, walletAddress } =
            contract?.interface.decodeFunctionResult('vendorBalance', vendorId) || {};
          return {
            cashAllowance: cashAllowance.toNumber(),
            cashBalance: cashBalance.toNumber(),
            tokenBalance: tokenBalance.toNumber(),
            hasVendorRole,
            walletAddress,
          };
        });
        return decodedData;
      } catch (e) {
        console.log(e);
        //handleContractError(e);
      }
    },

    async beneficiaryBalance(phone) {
      try {
        const balanceData = await contract?.beneficiaryBalance(phone);
        const data = {
          walletAddress: balanceData?.walletAddress,
          totalTokenIssued: balanceData?.totalTokenIssued?.toNumber(),
          cashBalance: balanceData?.cashBalance?.toNumber(),
          tokenBalance: balanceData?.tokenBalance?.toNumber(),
          isBanked: balanceData?.hasBankAccount,
        };
        setBeneficiaryData((d) => ({
          ...d,
          ...data,
        }));
        return data;
      } catch (e) {
        handleContractError(e);
      }
    },

    //Log functions
    getVendorClaimLogs(vendorAddress) {
      return getLogs('ClaimAcquiredERC20(address,uint256,uint256)', {
        topic1: contract?.interface._abiCoder.encode(['address'], [vendorAddress]),
        topic0_1_opr: 'and',
      });
    },

    getBeneficiaryClaimLogs(phone) {
      phone = parseInt(phone);
      return getLogs('ClaimAcquiredERC20(address,uint256,uint256)', {
        topic2: contract?.interface._abiCoder.encode(['uint256'], [phone]),
        topic0_2_opr: 'and',
      });
    },

    // Bulk Assign Tokens to Beneficiaries
    multicall: {
      async send(callData) {
        console.log('++++Sending Transaction++++');
        let estimatedGas = await contract?.estimateGas.multicall(callData);
        const gasLimit = estimatedGas.toNumber() + 10000;
        if (estimatedGas.toNumber() > networkGasLimit) throw new Error('Gas Usage too high! Transaction will fail');
        const tx = await contract?.multicall(callData, { gasLimit });
        const receipt = await tx.wait();
        console.log({ receipt });
        if (receipt.status) {
          console.log('++++Transaction Success++++');
        } else {
          console.log('++++Transaction Failed++++');
        }
      },
      async call(callData) {
        console.log('++++Calling Contract++++');
        return contract?.callStatic.multicall(callData);
      },
    },

    async bulkBeneficiaryBalance(phones) {
      const callData = phones.map(async (phone) => contract?.generateMultiCallData('beneficiaryBalance', [phone]));
      const res = await contract?.multicall.call(callData);
      const iface = new ethers.utils.Interface(rahatAbi);
      const decodedData = res.map((el) => iface.decodeFunctionResult('beneficiaryBalance', el));
      return decodedData;
    },

    async filterBeneficiaryWithXTokens(phones, hasXAmount = 0) {
      const data = await this.bulkBeneficiaryBalance(phones);
      const balances = data.map((el, i) => ({
        phone: phones[i],
        walletAddress: el.walletAddress,
        tokenBalance: el.tokenBalance.toNumber(),
        hasBankAccount: el.hasBankAccount,
        totalTokenIssued: el.totalTokenIssued.toNumber(),
      }));
      return balances.filter((el) => el.totalTokenIssued === hasXAmount).map((el) => el.phone);
    },

    async bulkIssue(projectId, phones, tokenAmount = 20) {
      const callData = phones.map(async (phone) =>
        contract?.generateMultiCallData('issueERC20ToBeneficiary', [projectId, phone, tokenAmount])
      );
      await contract?.multicall.send(callData);
    },

    async bulkAssignTokensToBeneficiaries(projectId, beneficiaryPhones, tokenAmount) {
      try {
        const phoneGroups = splitArrayToChunks(beneficiaryPhones, 100);
        let i = 0;
        for (let el of phoneGroups) {
          console.log('Issuing Tokens to:', el);
          i++;
          console.log(`PROGRESS: ${i} out of ${phoneGroups.length}`);
          const filteredBen = await this.filterBeneficiaryWithXTokens(el);
          console.log({ filteredBen });
          if (filteredBen.length) await this.bulkIssue(projectId, filteredBen, tokenAmount);
        }
        console.log('Token Issuance Completed');
      } catch (e) {
        console.log(e);
        handleContractError(e);
      }
    },
  };
};
