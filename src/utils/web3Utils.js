import { NETWORK_GAS_LIMIT } from '@config';
import EthCrypto from 'eth-crypto';
import { ethers } from 'ethers';

const Web3Utils = {
  getRandomString(length) {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  },

  getRandomEntropy() {
    const randomChars = this.getRandomString(128);
    return Buffer.from(randomChars, 'utf-8');
  },

  createRandomIdentity() {
    const entropy = this.getRandomEntropy();
    return EthCrypto.createIdentity(entropy);
  },

  getWallet(privateKey) {
    if (!privateKey) return '';
    const wallet = new ethers.Wallet(privateKey);
    return wallet;
  },

  parseFromOtpKey(otpKey) {
    return EthCrypto.cipher.parse(otpKey);
  },

  decryptedKey(privateKey, encryptedData) {
    return EthCrypto.decryptWithPrivateKey(privateKey, encryptedData);
  },

  keccak256(text) {
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(text));
  },

  generateMultiCallData(abi, functionName, params) {
    const iface = new ethers.utils.Interface(abi);
    return iface.encodeFunctionData(functionName, params);
  },

  decodeMultiCallData(abi, functionName, data) {
    const iface = new ethers.utils.Interface(abi);
    return iface.decodeFunctionResult(functionName, data);
  },

  multicall: {
    async send(callData, contract) {
      console.log('++++Sending Transaction++++');
      console.log('contract', contract);
      let estimatedGas = await contract.estimateGas.multicall(callData);
      console.log('estimatedGas', estimatedGas);
      const gasLimit = estimatedGas.toNumber() + 10000;
      console.log('gasLimit', gasLimit);
      if (estimatedGas.toNumber() > NETWORK_GAS_LIMIT) throw new Error('Gas Usage too high! Transaction will fail');
      const tx = await contract.multicall(callData, { gasLimit });
      const receipt = await tx.wait();
      console.log({ receipt });

      if (receipt.status) {
        console.log('++++Transaction Success++++');
        return receipt;
      } else {
        console.log('++++Transaction Failed++++');
        throw new Error('Transaction Failed');
      }
    },
    async call(callData, contract) {
      console.log('++++Calling Contract++++');
      return contract.callStatic.multicall(callData);
    },
  },
};

export default Web3Utils;
