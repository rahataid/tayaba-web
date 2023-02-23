import axios from 'axios';
import { CHAINCACHE_URL, CHAINCACHE_APPID } from '@config';

let chainCacher = axios.create({
  baseURL: `${CHAINCACHE_URL}`,
  timeout: 10000,
  headers: { 'app-uuid': CHAINCACHE_APPID },
});

export const ChainCacheService = {
  listContractTransactions: async (address) => {
    let response = await chainCacher.get(`/contracts/${address}/events?names=ClaimAssigned,ClaimProcessed`);
    return response.data;
  },

  listTransactions: async (params) => {
    let response = await chainCacher.get(`/transactions`, {
      params,
    });
    return response.data;
  },

  getTransaction: async (txHash) => {
    let response = await chainCacher.get(`/transactions/${txHash}`);
    return response.data;
  },
};
