import axios from 'axios';
import { CHAINCACHE_URL, CHAINCACHE_APPID } from '@config';

let chainCacher = axios.create({
  baseURL: `${CHAINCACHE_URL}`,
  timeout: 10000,
  headers: { 'app-uuid': CHAINCACHE_APPID },
});

export const ChainCacheService = {
  listTransactions: async (address) => {
    let response = await chainCacher.get(`/contracts/${address}/events?names=ClaimAssigned,ClaimProcessed`);
    return response.data;
  },
};
