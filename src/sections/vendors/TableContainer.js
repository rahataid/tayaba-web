import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useVendorsContext } from '@contexts/vendors';
import { Box, Button, Pagination, TableCell, TableRow } from '@mui/material';
import { useProject } from '@services/contracts/useProject';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const TABLE_HEAD = {
  name: {
    id: 'name',
    // id: 'timestamp',
    label: 'Name',
    align: 'left',
  },
  projectsInvolved: {
    id: 'projectsInvolved',
    label: 'Projects Involved',
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
  const router = useRouter();
  const [start, setStart] = useState(0);
  const { getVendorsList, vendors } = useVendorsContext();

  useProject;
  const handleView = (id) => () => {
    router.push(`/vendors/${id}`);
  };

  const handlePagination = (event, page) => {
    const start = (page - 1) * vendors.limit;
    setStart(start);
  };

  const paginateFilter = <Pagination count={vendors?.totalpages} onChange={handlePagination} />;

  useEffect(() => {
    getVendorsList({ start });
  }, [getVendorsList, start]);

  return (
    <Box>
      <ListTable tableRowsList={vendors?.data} tableHeadersList={TABLE_HEAD}>
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['name'].align}>{row.name}</TableCell>
              <TableCell align={tableHeadersList['projectsInvolved'].align}>
                {row?.vendor_project_details?.map(({ name }) => name)}
              </TableCell>
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
