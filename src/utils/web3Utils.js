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
};

export default Web3Utils;
