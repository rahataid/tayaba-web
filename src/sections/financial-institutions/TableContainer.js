import { Box, Button, Chip, TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import ListTableToolbar from './ListTableToolbar';
import { useRouter } from 'next/router';
import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useFinancialInstitutionsContext } from '@contexts/financial-institutions';

const TableContainer = () => {
  const router = useRouter();

  const { getFIList, financialInstitutions } = useFinancialInstitutionsContext();

  useEffect(() => {
    getFIList();
  }, [getFIList]);

  const handleView = (id) => () => {
    router.push(`/financial-institutions/${id}`);
  };

  // #region Table Headers
  const TABLE_HEAD = {
    name: {
      id: 'name',
      // id: 'timestamp',
      label: 'Name',
      align: 'left',
    },
    phone: {
      id: 'phone',
      label: 'Phone',
      align: 'left',
    },
    address: {
      id: 'address',
      label: 'Address',
      align: 'left',
    },
    status: {
      id: 'status',
      label: 'Status',
      align: 'left',
    },
    action: {
      id: 'action',
      label: 'Action',
      align: 'left',
    },
  };
  // #endregion

  return (
    <Box>
      <ListTableToolbar />
      <ListTable tableRowsList={financialInstitutions} tableHeadersList={TABLE_HEAD}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>
              <TableCell align={tableHeadersList['phone'].align}>{row.phone}</TableCell>
              <TableCell align={tableHeadersList['address'].align}>{row.address}</TableCell>
              <TableCell align={tableHeadersList['status'].align}>
                <Chip label={row.status} />
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
