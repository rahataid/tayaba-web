import client from '@utils/client';

export const TransactionService = {
  getTransactionList(params) {
    return client.get('/transactions', { params });
  },

  addTransactionData(payload) {
    return client.post('/transactions', payload);
  },
};
