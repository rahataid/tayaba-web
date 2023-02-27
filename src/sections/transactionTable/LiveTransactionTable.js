import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Stack, Pagination, TableRow, TableCell } from '@mui/material';
import ListTable from '@components/table/ListTable';
import useWSTransaction from '@hooks/useWSTransaction';
import { ChainCacheService } from '@services';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import { PATH_REPORTS, PATH_TRANSACTIONS } from '@routes/paths';
import { useAuthContext } from 'src/auth/useAuthContext';
import { CONTRACTS } from '@config';
import truncateEthAddress from '@utils/truncateEthAddress';
import moment from 'moment';
import WalletExplorerButton from '@components/button/WalletExplorerButton';
import Link from 'next/link';

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
  method: {
    id: 'method',
    label: 'Method',
    align: 'left',
  },
  action: {
    id: 'action',
    label: 'Action',
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
      const { data } = await ChainCacheService.listTransactions({
        method:
          'mintTokenAndApprove,acceptToken,createAllowanceToVendor,acceptAllowanceByVendor,lockProject,unlockProject,processTokenRequest',
      });
      const formatted = data.map((tx) => ({
        ...tx,
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
      <ListTable tableHeadersList={TABLE_HEAD} tableRowsList={list}>
        {(rows, headers) =>
          rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align={headers['timestamp'].align}>{moment.unix(row.timestamp).fromNow()}</TableCell>
              <TableCell align="left">
                <WalletExplorerButton address={row.txHash} copyButton={false} />
              </TableCell>
              <TableCell align="left">{row.method}</TableCell>

              <TableCell align="left">
                <Button onClick={() => router.push(PATH_TRANSACTIONS.view(row.txHash))} variant="text">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </ListTable>
      <Pagination count={list?.totalPage} onChange={handlePagination} />
    </Card>
  );
};

export default LiveTransactionTable;
