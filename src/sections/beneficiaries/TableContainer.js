import { Box, Button, TablePagination, TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import ListTableToolbar from './ListTableToolbar';
import { useRouter } from 'next/router';
import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useBeneficiaryContext } from '@contexts/beneficiaries';

const TableContainer = () => {
  const router = useRouter();
  const { getBeneficiariesList, filter, beneficiaries, errorMessage, getAllVillages, setPagination, pagination } =
    useBeneficiaryContext();
  useEffect(() => {
    getBeneficiariesList();
  }, [getBeneficiariesList, filter]);

  useEffect(() => {
    getAllVillages();
  }, [getAllVillages]);

  const handleView = (id) => () => {
    router.push(`/beneficiaries/${id}`);
  };

  // #region Table Headers
  const TABLE_HEAD = {
    name: {
      id: 'name',
      label: 'Name',
      align: 'left',
    },
    cnicNumber: {
      id: 'cnicNumber',
      label: 'CNIC Number',
      align: 'left',
    },
    hasInternetAccess: {
      id: 'hasInternetAccess',
      label: 'Has Internet Access',
      align: 'left',
    },
    status: {
      id: 'status',
      label: 'Status',
      align: 'left',
    },
    tokensAssigned: {
      id: 'tokensAssigned',
      label: 'Tokens Assigned',
      align: 'left',
    },
    tokensClaimed: {
      id: 'tokensClaimed',
      label: 'Tokens Claimed',
      align: 'left',
    },
    action: {
      id: 'action',
      label: 'Action',
      align: 'left',
    },
  };
  // #endregion
  const handleRowChange = (e, limit) => {
    setPagination({ limit: e.target.value, start: 0, page: 0 });
  };

  return (
    <Box>
      <ListTableToolbar />
      <ListTable tableRowsList={beneficiaries.data} tableHeadersList={TABLE_HEAD} errorMessage={errorMessage}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>

              <TableCell align={tableHeadersList['cnicNumber'].align}>{row.cnicNumber}</TableCell>

              <TableCell align={tableHeadersList['hasInternetAccess'].align}>{row.hasInternetAccess}</TableCell>

              <TableCell align={tableHeadersList['status'].align}>
                <Chip label={row.status} color={row.isActivated ? 'success' : 'error'} />
              </TableCell>
              <TableCell align={tableHeadersList['tokensAssigned'].align}>{row.tokensAssigned}</TableCell>

              <TableCell align={tableHeadersList['tokensClaimed'].align}>{row.tokensClaimed}</TableCell>

              <TableCell align={tableHeadersList['action'].align}>
                <Button onClick={handleView(row.id)} variant="text">
                  <Iconify icon="ic:outline-remove-red-eye" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </ListTable>
      <TablePagination
        count={beneficiaries?.count}
        component="div"
        page={pagination?.page}
        rowsPerPage={pagination?.limit}
        onPageChange={(e, page) => {
          setPagination({ start: page * pagination.limit, limit: pagination.limit, page: page });
        }}
        onRowsPerPageChange={handleRowChange}
      />
    </Box>
  );
};

export default TableContainer;
