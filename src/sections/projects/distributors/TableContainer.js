import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useProjectContext } from '@contexts/projects';
import { Box, Button, Pagination, TableCell, TableRow } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TABLE_HEAD = {
  name: {
    id: 'name',
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

export default function TableContainerView() {
  const {
    query: { projectId },
    push,
  } = useRouter();
  const [start, setStart] = useState(0);
  const { getProjectByAddress, vendors } = useProjectContext();

  const handleView = (id) => () => {
    push(`/vendors/${id}`);
  };

  const handlePagination = (event, page) => {
    const start = (page - 1) * vendors.limit;
    setStart(start);
  };

  const paginateFilter = <Pagination count={vendors?.totalpages} onChange={handlePagination} />;

  useEffect(() => {
    getProjectByAddress(projectId);
  }, [getProjectByAddress]);

  return (
    <Box>
      <ListTable tableRowsList={vendors} tableHeadersList={TABLE_HEAD}>
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
}
