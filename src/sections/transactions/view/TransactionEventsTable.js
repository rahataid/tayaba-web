import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, TableCell, TableRow, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';
import { arrayToObject } from '@utils/flattenArray';

const TransactionEventsTable = ({ transaction }) => {
  const formatParams = (params) => arrayToObject(params);

  return (
    <Card
      sx={{
        mt: 2,
      }}
    >
      <CardHeader title={<Typography variant="subtitle1">{'Events'}</Typography>} />
      <CardContent>
        {transaction?.events?.map((event) => (
          <Card
            sx={{
              mt: 2,
            }}
            key={event?.id}
          >
            <CardHeader title={<Typography variant="subtitle1">{event.name}</Typography>} />
            <CardContent>
              <ListTable tableRowsList={event?.params} tableHeadersList={formatParams(event?.params)}>
                {(rows, header) => (
                  <TableRow key={rows.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {Object.keys(header).map((key) => (
                      <TableCell key={header[key].value} align={header[key].align}>
                        {header[key].value}
                      </TableCell>
                    ))}
                  </TableRow>
                )}
              </ListTable>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

TransactionEventsTable.propTypes = {
  transaction: PropTypes.object,
};

export default TransactionEventsTable;
