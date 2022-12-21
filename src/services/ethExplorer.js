import { BLOCKCHAIN_EXPLORER } from '@config';
import axios from 'axios';
import { utils } from 'ethers';

const api = axios.create({
  baseURL: BLOCKCHAIN_EXPLORER,
});

const EthExplorer = {
  getLogs: async ({ topic0, ...params }) => {
    const response = await api.get('/api', {
      params: {
        module: 'logs',
        action: 'getLogs',
        fromBlock: 0,
        toBlock: 'latest',
        topic0: utils.id(topic0),
        ...params,
      },
    });
    return response.data;
  },
};

export default EthExplorer;
