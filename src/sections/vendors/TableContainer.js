import { Box, Button, Chip, Pagination, TableCell, TableRow } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
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
  gender: {
    id: 'gender',
    label: 'Gender',
    align: 'left',
  },
  phone: {
    id: 'phone',
    label: 'Phone',
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
  const [start, setStart] = useState(0);
  const { getVendorsList, vendors } = useVendorsContext();

  useEffect(() => {
    getVendorsList({ start });
  }, [getVendorsList, setStart]);

  const handleView = (id) => () => {
    router.push(`/vendors/${id}`);
  };

  const handlePagination = (event, page) => {
    const start = (page - 1) * vendors.limit;
    setStart(start);
  };

  const paginateFilter = <Pagination count={vendors?.totalpages} onChange={handlePagination} />;

  return (
    <Box>
      {/* <ListTableToolbar /> */}
      <ListTable tableRowsList={vendors?.data} tableHeadersList={TABLE_HEAD} footer={paginateFilter}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>
              <TableCell align={tableHeadersList['gender'].align}>{row.gender}</TableCell>
              <TableCell align={tableHeadersList['phone'].align}>{row.phone}</TableCell>
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
