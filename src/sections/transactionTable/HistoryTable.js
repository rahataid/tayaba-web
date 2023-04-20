import ListTable from '@components/table/ListTable';
import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const HistoryTable = ({ tableRowsList, tableHeadersList, ...other }) => (
  <Card>
    <CardContent>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 2,
        }}
      >
        Transaction History
      </Typography>

      <ListTable tableHeadersList={tableHeadersList} tableRowsList={tableRowsList} {...other} />
    </CardContent>
  </Card>
);

HistoryTable.propTypes = {
  tableRowsList: PropTypes.array,
  tableHeadersList: PropTypes.object,
};

export default HistoryTable;
