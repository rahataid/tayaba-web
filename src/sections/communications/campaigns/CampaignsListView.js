import Iconify from '@components/iconify';
import ListTable from '@components/table/ListTable';
import { useCommunications } from '@contexts/communications';
import { Box, Button, Stack, TableCell, TableRow } from '@mui/material';
import { CommunicationService } from '@services/communications';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
  const { push } = useRouter();

  const handleTriggerCampaign = (id) => async () => {
    try {
      const success = await CommunicationService.triggerCampaign(id);
      console.log('success', success);
    } catch (error) {
      console.log(error);
    }
  };

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
                  <Button
                    startIcon={<Iconify icon="grommet-icons:trigger" />}
                    onClick={handleTriggerCampaign(row?.id)}
                  />
                  <Button
                    startIcon={<Iconify icon="ic:outline-remove-red-eye" />}
                    onClick={() => push(`/communications/campaigns/${row.id}`)}
                  />
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
