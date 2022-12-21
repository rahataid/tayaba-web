import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';

const HistoryTable = ({ tableRowsList, tableHeadersList, ...other }) => (
  <Card>
    <CardContent>
      <Typography
        variant="h5"
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
  tableHeadersList: PropTypes.array,
};

export default HistoryTable;
