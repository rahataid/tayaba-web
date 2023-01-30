import client from '@utils/client';

export const TransactionService = {
  getTransactionList() {
    return client.get('/transactions');
  },

  addTransactionData(payload) {
    return client.post('/transactions', payload);
  },
};
