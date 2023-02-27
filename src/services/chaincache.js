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

  listTransactionsByVendor: async (contractAddress, vendorAddress) => {
    let response = await chainCacher.get(`/contracts/${contractAddress}/events?names=ClaimProcessed`);
    const rows = response.data.data.rows.filter(
      (row) => row.params.find((param) => param.name === 'vendor')?.value === vendorAddress.toLowerCase()
    );
    return rows;
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
