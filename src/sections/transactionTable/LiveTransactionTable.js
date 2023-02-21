import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Stack, Pagination } from '@mui/material';
import ListTable from '@components/table/ListTable';
import useWSTransaction from '@hooks/useWSTransaction';
import { ChainCacheService } from '@services';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import { PATH_REPORTS } from '@routes/paths';
import { useAuthContext } from 'src/auth/useAuthContext';
import { CONTRACTS } from '@config';
import truncateEthAddress from '@utils/truncateEthAddress';

const TABLE_HEAD = {
  timestamp: {
    id: 'timestamp',
    // id: 'timestamp',
    label: 'Timestamp',
    align: 'left',
  },
  txHash: {
    id: 'txHash',
    label: 'TxHash',
    align: 'left',
  },
  name: {
    id: 'name',
    label: 'TxType',
    align: 'left',
  },
  beneficiary: {
    id: 'beneficiary',
    label: 'Beneficiary',
  },
  amount: {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },
};

const LiveTransactionTable = (props) => {
  const { contracts } = useAuthContext();
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();

  const [wsTableData, websocket] = useWSTransaction() || [{ data: {} }, { current: null }];
  const [start, setStart] = useState(0);

  const handlePagination = (event, page) => {
    let start = (page - 1) * list.limit;
    setStart(start);
  };

  useEffect(() => {
    if (!wsTableData?.data) return;
    setList((prev) => [wsTableData?.data, ...prev]);
  }, [wsTableData]);

  const fetchTransactionList = async () => {
    try {
      const {
        data: { rows },
      } = await ChainCacheService.listTransactions(contracts[CONTRACTS.CVAPROJECT]);
      const formatted = rows.map((tx) => ({
        ...tx,
        beneficiary: truncateEthAddress(tx.params.find((param) => param.name === 'beneficiary')?.value),
        amount: tx.params.find((param) => param.name === 'amount')?.value,
      }));
      setList(formatted);
    } catch (error) {
      console.error(error);
      setError(error?.message);
    }
  };

  useEffect(() => {
    fetchTransactionList();
  }, [start]);

  const tableFooter = (
    <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ p: 2 }}>
      <Button
        onClick={() => router.push(PATH_REPORTS.transaction)}
        endIcon={<Iconify icon={'material-symbols:chevron-right-rounded'} />}
      >
        View All
      </Button>
    </Stack>
  );

  return (
    <Card>
      {' '}
      {/* <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2 }} md={12}></Stack> */}
      {error && <Alert severity="error">{error}</Alert>}
      <ListTable tableHeadersList={TABLE_HEAD} tableRowsList={list} />
      <Pagination count={list?.totalPage} onChange={handlePagination} />
    </Card>
  );
};

export default LiveTransactionTable;
