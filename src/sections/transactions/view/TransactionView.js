import { TransactionService } from '@services/transactionTable';
import { useRouter } from 'next/router';
import { ChainCacheService } from '@services';
import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import TransactionItems from './TransactionItems';
import TransactionEventsTable from './TransactionEventsTable';

const TransactionView = () => {
  const {
    query: { txHash },
  } = useRouter();

  const [transaction, setTransaction] = useState({});

  const fetchSingleTransaction = useCallback(async () => {
    try {
      const { data } = await ChainCacheService.getTransaction(txHash);
      setTransaction(data);
    } catch (error) {
      console.log(error);
    }
  }, [txHash]);

  useEffect(() => {
    fetchSingleTransaction();
  }, [fetchSingleTransaction]);

  return (
    <Box sx={{ width: '100%' }}>
      <TransactionItems transaction={transaction} />
      <TransactionEventsTable transaction={transaction} />
    </Box>
  );
};

export default TransactionView;
