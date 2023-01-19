import { Box, Button, Pagination, TableCell, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProjectContext } from '@contexts/projects';
import ListTable from '@components/table/ListTable';
import Iconify from '@components/iconify';
import ListTableToolbar from './ListTableToolbar';

const TableContainer = () => {
  const {
    query: { projectId },
    push,
  } = useRouter();

  const { beneficiaries, getBeneficiariesByProject } = useProjectContext();
  const [start, setStart] = useState(0);

  useEffect(() => {
    if (!projectId) return;
    getBeneficiariesByProject({
      projectId,
      start,
    });
  }, [projectId]);

  const handleView = (id) => () => {
    push(`/beneficiaries/${id}`);
  };

  const handlePagination = (event, page) => {
    let start = (page - 1) * beneficiaries.limit;
    setStart(start);
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

  return (
    <Box sx={{ p: 1 }}>
      <ListTableToolbar />

      <ListTable tableRowsList={beneficiaries.data} tableHeadersList={TABLE_HEAD}>
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
      <Pagination count={beneficiaries?.totalPage} onChange={handlePagination} />
    </Box>
  );
};

export default TableContainer;
