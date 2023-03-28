import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Stack, TableCell, TableRow } from '@mui/material';
import ListTable from '@components/table/ListTable';
import { useCommunications } from '@contexts/communications';
import moment from 'moment';
import Iconify from '@components/iconify';

const tableHeaders = {
  name: {
    id: 'name',
    label: 'Name',
    align: 'left',
  },
  startTime: {
    id: 'startTime',
    label: 'Start Time',
    align: 'left',
  },
  type: {
    id: 'type',
    label: 'Type',
    align: 'left',
  },
  status: {
    id: 'status',
    label: 'Status',
    align: 'left',
  },
  transportName: {
    id: 'transportName',
    label: 'Transport Used',
    align: 'left',
  },
  totalAudiences: {
    id: 'totalAudiences',
    label: 'Total Audiences',
    align: 'left',
  },

  actions: {
    id: 'actions',
    label: 'Actions',
    align: 'left',
  },
};

const CampaignsListView = (props) => {
  const { campaigns, getCampaigns } = useCommunications();

  console.log('campaigns', campaigns);

  useEffect(() => {
    getCampaigns();
  }, [getCampaigns]);

  return (
    <Box>
      <ListTable size="dense" tableHeadersList={tableHeaders} tableRowsList={campaigns}>
        {(rows, headers) =>
          rows.map((row) => (
            <TableRow key={row?.id}>
              <TableCell align={headers['name'].align}>{row?.name}</TableCell>
              <TableCell align={headers['startTime'].align}>
                {moment(row?.startTime).format('DD/MM/YYYY h:m a')}
              </TableCell>
              <TableCell align={headers['type'].align}>{row?.type}</TableCell>
              <TableCell align={headers['status'].align}>{row?.status}</TableCell>
              <TableCell align={headers['transportName'].align}>{row?.transportName}</TableCell>
              <TableCell align={headers['totalAudiences'].align}>{row?.totalAudiences}</TableCell>
              <TableCell align={headers['actions'].align}>
                <Stack direction={'row'}>
                  <Button startIcon={<Iconify icon="grommet-icons:trigger" />} />
                  <Button startIcon={<Iconify icon="ic:outline-remove-red-eye" />} />
                </Stack>
              </TableCell>
            </TableRow>
          ))
        }
      </ListTable>
    </Box>
  );
};

CampaignsListView.propTypes = {};

export default CampaignsListView;
