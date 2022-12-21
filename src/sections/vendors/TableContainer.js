import { Box, Button, Chip, Pagination, TableCell, TableRow } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import ListTableToolbar from './ListTableToolbar';
import { useRouter } from 'next/router';
import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useVendorsContext } from '@contexts/vendors';
import moment from 'moment';

const TABLE_HEAD = {
  name: {
    id: 'name',
    // id: 'timestamp',
    label: 'Name',
    align: 'left',
  },
  cashAllowance: {
    id: 'cashAllowance',
    label: 'Cash Allowance',
    align: 'left',
  },
  cashBalance: {
    id: 'cashBalance',
    label: 'Cash Balance',
    align: 'left',
  },
  tokenBalance: {
    id: 'tokenBalance',
    label: 'Token Balance',
    align: 'left',
  },

  phone: {
    id: 'phone',
    label: 'Phone',
    align: 'left',
  },
  hasVendorRole: {
    id: 'hasVendorRole',
    label: 'Has Vendor Role',
    align: 'left',
  },

  registrationDate: {
    id: 'registrationDate',
    label: 'Registration Date',
    align: 'left',
  },
  action: {
    id: 'action',
    label: 'Action',
    align: 'left',
  },
};

const TableContainer = () => {
  const router = useRouter();
  const { getVendorsList, vendors } = useVendorsContext();

  useEffect(() => {
    getVendorsList();
  }, [getVendorsList]);

  const handleView = (id) => () => {
    router.push(`/vendors/${id}`);
  };

  const paginateFilter = <Pagination count={vendors?.start} />;

  return (
    <Box>
      {/* <ListTableToolbar /> */}
      <ListTable tableRowsList={vendors?.data} tableHeadersList={TABLE_HEAD} footer={paginateFilter}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>
              <TableCell align={tableHeadersList['cashAllowance'].align}>{row.cashAllowance}</TableCell>
              <TableCell align={tableHeadersList['cashBalance'].align}>{row.cashBalance}</TableCell>
              <TableCell align={tableHeadersList['tokenBalance'].align}>{row.tokenBalance}</TableCell>

              <TableCell align={tableHeadersList['phone'].align}>{row.phone}</TableCell>
              <TableCell align={tableHeadersList['hasVendorRole'].align}>{row.hasVendorRole}</TableCell>

              <TableCell align={tableHeadersList['registrationDate'].align}>
                {' '}
                {moment(row.registrationDate).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell align={tableHeadersList['action'].align}>
                <Button onClick={handleView(row.id)} variant="text">
                  <Iconify icon="ic:outline-remove-red-eye" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </ListTable>
    </Box>
  );
};

export default TableContainer;
