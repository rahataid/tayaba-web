import { Box, Button, Pagination, TablePagination, TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import ListTableToolbar from './ListTableToolbar';
import { useRouter } from 'next/router';
import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import moment from 'moment';
import { useAuthContext } from 'src/auth/useAuthContext';

const TableContainer = () => {
  const router = useRouter();
  const { roles } = useAuthContext();
  const { getBeneficiariesList, beneficiaries, errorMessage, getAllVillages, setPagination, pagination } =
    useBeneficiaryContext();
  useEffect(() => {
    getBeneficiariesList();
  }, [getBeneficiariesList]);

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
      // id: 'timestamp',
      label: 'Name',
      align: 'left',
      // show: roles.isPalika,
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
    cnicNumber: {
      id: 'cnicNumber',
      label: 'CNIC Number',
      align: 'left',
    },

    phoneOwnedBy: {
      id: 'phoneOwnedBy',
      label: 'Phone Owned By',
      align: 'left',
    },
    hasInternetAccess: {
      id: 'hasInternetAccess',
      label: 'Has Internet Access',
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
              <TableCell align={tableHeadersList['gender'].align}>{row.gender}</TableCell>

              {/* {roles.isPalika && <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>} */}
              <TableCell align={tableHeadersList['phone'].align}>{row.phone}</TableCell>

              {/* <TableCell align={tableHeadersList['registrationDate'].align}>
                {moment(row.registrationDate).format('MM/DD/YYYY')}
              </TableCell> */}
              <TableCell align={tableHeadersList['cnicNumber'].align}>{row.cnicNumber}</TableCell>
              <TableCell align={tableHeadersList['phoneOwnedBy'].align}>{row.phoneOwnedBy}</TableCell>
              <TableCell align={tableHeadersList['hasInternetAccess'].align}>{row.hasInternetAccess}</TableCell>

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
