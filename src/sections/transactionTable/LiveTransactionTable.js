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
  let data = [
    {
      name: 'Ragini Devi',
      phone: '9800818412',
      id: 11,
      txHash: '0x55542c184686fabbf5768dbafa1ee0235ddef6af7d224e0c8513cb44ebfb4568',
      blockNumber: '0x1288309',
      vendor: '0x03e021De0FB9334d5aFb4e224df541Ac51c2dAb9',
      amount: 1000,
      beneficiary: '9800818412',
      ward: 0,
      timestamp: 1673172301,
      year: null,
      method: 'unavailable',
      mode: 'unavailable',
      isClaimed: null,
      tokenIssued: null,
      createdBy: null,
      updatedBy: null,
      createdAt: '2023-01-08T10:10:37.313Z',
      updatedAt: '2023-01-08T10:10:37.313Z',
    },
    {
      name: 'Rajkumar paswan',
      phone: '9824866225',
      id: 6,
      txHash: '0xb06b1e88bf30d97ee66a009882558bb234835b1c73ec3fbf83a97cfa1a0d21cd',
      blockNumber: '0x12493d8',
      vendor: '0x0d80Dd4E933b79a03e4c02803521eB7e26421601',
      amount: 10000,
      beneficiary: '9824866225',
      ward: 0,
      timestamp: 1672398778,
      year: null,
      method: 'unavailable',
      mode: 'unavailable',
      isClaimed: null,
      tokenIssued: null,
      createdBy: null,
      updatedBy: null,
      createdAt: '2023-01-04T10:10:37.352Z',
      updatedAt: '2023-01-04T10:10:37.352Z',
    },
    {
      name: 'Rajkumar paswan',
      phone: '9824866225',
      id: 5,
      txHash: '0x3ad8cedb035a3677048540ad64ef61dc6fe917c071122a2ca245d7a39832ffeb',
      blockNumber: '0x1249372',
      vendor: '0x6914D1116DDc99F5D8351618cE6809bAAb945c2A',
      amount: 10000,
      beneficiary: '9824866225',
      ward: 0,
      timestamp: 1672398472,
      year: null,
      method: 'unavailable',
      mode: 'unavailable',
      isClaimed: null,
      tokenIssued: null,
      createdBy: null,
      updatedBy: null,
      createdAt: '2023-01-04T10:10:37.352Z',
      updatedAt: '2023-01-04T10:10:37.352Z',
    },
    {
      name: 'Birendra pasman',
      phone: '9990010181',
      id: 4,
      txHash: '0xa625d90c0b1b081f76a8d89bdfd94386f4192ea3c30f43560522757902de19fb',
      blockNumber: '0x12492ff',
      vendor: '0x03e021De0FB9334d5aFb4e224df541Ac51c2dAb9',
      amount: 10000,
      beneficiary: '9990010181',
      ward: 0,
      timestamp: 1672398127,
      year: null,
      method: 'unavailable',
      mode: 'unavailable',
      isClaimed: null,
      tokenIssued: null,
      createdBy: null,
      updatedBy: null,
      createdAt: '2023-01-04T10:10:37.352Z',
      updatedAt: '2023-01-04T10:10:37.352Z',
    },
    {
      name: 'Rajkumar paswan',
      phone: '9824866225',
      id: 3,
      txHash: '0xa2003b95aa7a7ceeedbb55e828acecb1da293f13fd362f9136d5360c5803297d',
      blockNumber: '0x12492e1',
      vendor: '0x03e021De0FB9334d5aFb4e224df541Ac51c2dAb9',
      amount: 10000,
      beneficiary: '9824866225',
      ward: 0,
      timestamp: 1672398037,
      year: null,
      method: 'unavailable',
      mode: 'unavailable',
      isClaimed: null,
      tokenIssued: null,
      createdBy: null,
      updatedBy: null,
      createdAt: '2023-01-04T10:10:37.352Z',
      updatedAt: '2023-01-04T10:10:37.352Z',
    },
  ];

  useEffect(() => {
    if (!wsTableData?.data) return;
    setList((prev) => [wsTableData?.data, ...prev]);
  }, [wsTableData]);

  const fetchTransactionList = async () => {
    try {
      //  const response = await TXService.transactionList();
      setList(data);
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
      <ListTable tableHeadersList={TABLE_HEAD} tableRowsList={data} />
    </Card>
  );
};

export default LiveTransactionTable;
