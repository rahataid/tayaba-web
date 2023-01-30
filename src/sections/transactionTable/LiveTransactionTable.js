import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardHeader, Grid, Stack, Pagination } from '@mui/material';
import ListTable from '@components/table/ListTable';
import useWSTransaction from '@hooks/useWSTransaction';
import { TransactionService } from '@services/transactionTable';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import { PATH_REPORTS } from '@routes/paths';

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
    label: 'Beneficiary',
    align: 'left',
  },
  functionType: {
    id: 'functionType',
    label: 'Type',
  },

  amount: {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },

  txType: {
    id: 'txType',
    label: 'txType',
    align: 'left',
  },

  mode: {
    id: 'mode',
    label: 'Mode',
    align: 'left',
  },
};

const LiveTransactionTable = (props) => {
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
        data: { data },
      } = await TransactionService.getTransactionList();
      const formatted = data.data.map((tx) => ({
        ...tx,
        name: tx.beneficiary_data.name,
        village: 'name',
        mode: tx.isOffline ? 'Offline' : 'Online',
        functionType: 'Beneficiary Assign',
        txType: tx.txType,
        timestamp: tx?.timestamp,
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
