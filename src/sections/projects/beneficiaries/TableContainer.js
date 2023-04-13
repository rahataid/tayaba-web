import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useProjectContext } from '@contexts/projects';
import { Box, Button, Checkbox, Chip, TableCell, TablePagination, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import ListTableToolbar from './ListTableToolbar';

const TableContainer = () => {
  const {
    query: { projectId },
    push,
  } = useRouter();

  const { beneficiaries, getBeneficiariesByProject, getProjectByAddress, singleProject } = useProjectContext();
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const { roles } = useAuthContext();
  const [isAllChecked, setIsAllChecked] = useState(false);
  console.log(projectId);

  useEffect(() => {
    if (!projectId) return;
    getBeneficiariesByProject({
      contractAddress: projectId,
      start,
      limit,
    });
  }, [projectId, start, limit]);

  const handleView = (walletAddress) => () => {
    push(`/beneficiaries/${walletAddress}`);
  };
  const removeAll = () => {
    const benList = beneficiaries.data.map((beneficiary) => beneficiary.walletAddress);
    setSelectedBeneficiaries(selectedBeneficiaries.filter((x) => !benList.includes(x)));
  };
  const handlePagination = (event, page) => {
    let start = page * beneficiaries.limit;
    setStart(start);
    setPage(page);
  };
  const handleRowChange = (e) => {
    setLimit(e.target.value);
    setStart(0);
    setPage(0);
  };

  const handleCheck = useCallback(() => {
    if (!beneficiaries || !beneficiaries?.data) return;
    const walletArr = beneficiaries?.data?.map((elem) => elem.walletAddress);
    const set2 = new Set(selectedBeneficiaries);
    setIsAllChecked(walletArr.every((item) => set2.has(item)));
  }, [selectedBeneficiaries, beneficiaries]);
  useEffect(() => {
    handleCheck();
  }, [handleCheck]);
  // #region Table Headers
  const TABLE_HEAD = {
    select: {
      id: 'select',
      label: (
        <Checkbox
          defaultChecked={false}
          indeterminate={selectedBeneficiaries.length > 0 && !isAllChecked}
          checked={isAllChecked}
          onChange={(e) => {
            const { checked } = e.target;
            if (checked) {
              setSelectedBeneficiaries([
                ...selectedBeneficiaries,
                ...beneficiaries.data.map((beneficiary) => beneficiary.walletAddress),
              ]);
            } else {
              removeAll();
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
      show: !roles.isStakeholder,
    },
  };
  // #endregion

  return (
    <Box sx={{ p: 1 }}>
      <ListTableToolbar selectedBeneficiaries={selectedBeneficiaries} />
      <TablePagination
        count={beneficiaries?.count}
        component="div"
        page={page}
        rowsPerPage={beneficiaries?.limit}
        onPageChange={handlePagination}
        onRowsPerPageChange={handleRowChange}
      />
      <ListTable tableRowsList={beneficiaries.data} tableHeadersList={TABLE_HEAD}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
              <TableCell align={tableHeadersList['name'].align}>{roles.isStakeholder ? 'XXXX' : row.name}</TableCell>

              <TableCell align={tableHeadersList['cnicNumber'].align}>
                {roles.isStakeholder ? 'XXXX' : row.cnicNumber}
              </TableCell>

              <TableCell align={tableHeadersList['hasInternetAccess'].align}>{row.hasInternetAccess}</TableCell>

              <TableCell align={tableHeadersList['status'].align}>
                <Chip label={row.status} color={row.isActivated ? 'success' : 'error'} />
              </TableCell>

              <TableCell align={tableHeadersList['tokensAssigned'].align}>{row.tokensAssigned}</TableCell>

              <TableCell align={tableHeadersList['tokensClaimed'].align}>{row.tokensClaimed}</TableCell>

              {!roles.isStakeholder && (
                <TableCell align={tableHeadersList['action'].align}>
                  <Button onClick={handleView(row.walletAddress)} variant="text">
                    <Iconify icon="ic:outline-remove-red-eye" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))
        }
      </ListTable>
      <TablePagination
        count={beneficiaries?.count}
        component="div"
        page={page}
        rowsPerPage={beneficiaries?.limit}
        onPageChange={handlePagination}
        onRowsPerPageChange={handleRowChange}
      />
    </Box>
  );
};

export default TableContainer;
