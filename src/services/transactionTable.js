import client from '@utils/client';

export const transactionList = () => client.get('/claimAcquiredERC20Transactions');
