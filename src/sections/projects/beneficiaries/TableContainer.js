import { Box, Button, Checkbox, Chip, Pagination, TableCell, TableRow } from '@mui/material';
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
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);

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
    select: {
      id: 'select',
      label: (
        <Checkbox
          defaultChecked={false}
          indeterminate={selectedBeneficiaries.length > 0 && selectedBeneficiaries.length < beneficiaries.data.length}
          onChange={(e) => {
            const { checked } = e.target;
            if (checked) {
              setSelectedBeneficiaries(beneficiaries.data.map((beneficiary) => beneficiary.walletAddress));
            } else {
              setSelectedBeneficiaries([]);
            }
          }}
        />
      ),
      align: 'left',
    },
    name: {
      id: 'name',
      // id: 'timestamp',
      label: 'Name',
      align: 'left',
      // show: roles.isPalika,
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

  return (
    <Box sx={{ p: 1 }}>
      <ListTableToolbar selectedBeneficiaries={selectedBeneficiaries} />

      <ListTable tableRowsList={beneficiaries.data} tableHeadersList={TABLE_HEAD}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['select'].align}>
                <Checkbox
                  checked={selectedBeneficiaries.includes(row.walletAddress)}
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      setSelectedBeneficiaries([...selectedBeneficiaries, row.walletAddress]);
                    } else {
                      setSelectedBeneficiaries(
                        selectedBeneficiaries.filter((beneficiary) => beneficiary !== row.walletAddress)
                      );
                    }
                  }}
                />
              </TableCell>
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
      <Pagination count={beneficiaries?.totalPage} onChange={handlePagination} />
    </Box>
  );
};

export default TableContainer;
