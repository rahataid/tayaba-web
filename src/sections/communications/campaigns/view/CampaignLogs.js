import ListTable from '@components/table/ListTable';
import { Card, CardContent, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';

const CampaignLogs = ({ logs }) => {
  const TABLE_HEAD = {
    createdAt: {
      id: 'createdAt',
      label: 'Date',
      align: 'left',
    },
    status: {
      id: 'status',
      label: 'Status',
      align: 'left',
    },
    receiver: {
      id: 'receiver',
      label: 'Receiver',
      align: 'left',
    },
  };
  return (
    <Card>
      <CardHeader title="Campaign Logs" />
      <CardContent>
        <ListTable tableRowsList={logs} tableHeadersList={TABLE_HEAD} />
      </CardContent>
    </Card>
  );
};

CampaignLogs.propTypes = {
  logs: PropTypes.array.isRequired,
};

export default CampaignLogs;
