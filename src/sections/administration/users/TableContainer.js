import { Box, Button, Chip, Pagination, TableCell, TableRow } from '@mui/material';
import ListTable from '@components/table/ListTable';
import { useAdministrationContext } from '@contexts/administration';
import ListTableToolbar from './ListTableToolbar';
import { Card, CardContent } from '@mui/material';
import React, { useEffect } from 'react';
const TABLE_HEAD = {
  name: {
    id: 'name',
    label: 'Name',
    align: 'center',
  },

  roles: {
    id: 'roles',
    label: 'Roles',
    align: 'center',
  },

  email: {
    id: 'email',
    label: 'Email',
    align: 'center',
  },

  isApproved: {
    id: 'isApproved',
    label: 'Approved',
    align: 'center',
  },
};

const TableContainer = () => {
  const { getUsersList, users, setPagination, pagination } = useAdministrationContext();

  useEffect(() => {
    getUsersList();
  }, [getUsersList]);

  return (
    <Card>
      <CardContent>
        <ListTableToolbar />
        <ListTable tableRowsList={users.data} tableHeadersList={TABLE_HEAD}>
          {(rows, tableHeadersList) =>
            rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>
                <TableCell align={tableHeadersList['roles'].align}>
                  <Chip label={row.roles} />
                </TableCell>

                <TableCell align={tableHeadersList['email'].align}>{row.email}</TableCell>

                <TableCell align={tableHeadersList['isApproved'].align}>
                  {' '}
                  <Chip label={row.isApproved} />
                </TableCell>
              </TableRow>
            ))
          }
        </ListTable>
      </CardContent>
      <Pagination
        count={users?.totalPage}
        page={+pagination.start}
        onChange={(e, page) => {
          setPagination({ start: page, limit: pagination.limit });
        }}
      />
    </Card>
  );
};

export default TableContainer;
