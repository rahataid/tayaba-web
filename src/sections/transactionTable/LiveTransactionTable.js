import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Card, CardHeader, Grid, Stack, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';
import useWSTransaction from '@hooks/useWSTransaction';
import * as TXService from '@services/transactionTable';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import { PATH_REPORTS } from '@routes/paths';

const TABLE_HEAD = {
  createdAt: {
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

  amount: {
    id: 'amount',
    label: 'Amount',
    align: 'left',
  },

  ward: {
    id: 'ward',
    label: 'Ward',
    align: 'left',
  },
  method: {
    id: 'method',
    label: 'Method',
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

  useEffect(() => {
    if (!wsTableData?.data) return;
    setList((prev) => [wsTableData?.data, ...prev]);
  }, [wsTableData]);

  const fetchTransactionList = async () => {
    try {
      const response = await TXService.transactionList();
      setList(response.data.data);
    } catch (error) {
      console.error(error);
      setError(error?.message);
    }
  };

  useEffect(() => {
    fetchTransactionList();
  }, []);

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
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2 }} md={12}>
        <CardHeader
          title={
            <Grid container spacing={0.5}>
              <Typography variant="h6" sx={{ mt: -1.8 }}>
                Live Claimed Transactions ( {`${list.length}`} )
              </Typography>
            </Grid>
          }
        />
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
      <ListTable tableHeadersList={TABLE_HEAD} tableRowsList={list} />
    </Card>
  );
};

export default LiveTransactionTable;
