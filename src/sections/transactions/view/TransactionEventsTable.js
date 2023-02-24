import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, Stack, TableCell, TableRow, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';
import { arrayToObject } from '@utils/flattenArray';
import WalletExplorerButton from '@components/button/WalletExplorerButton';
import truncateEthAddress from '@utils/truncateEthAddress';
import { useAuthContext } from 'src/auth/useAuthContext';

const TransactionEventsTable = ({ transaction }) => {
  const formatParams = (params) => arrayToObject(params);

  const { contracts } = useAuthContext();

  const getObjectKeyByValue = (object, value) =>
    Object.keys(object).find((key) => object[key]?.toLowerCase() === value?.toLowerCase());

  return (
    <Card
      sx={{
        mt: 2,
      }}
    >
      <CardHeader title={<Typography variant="subtitle1">{'Events'}</Typography>} />
      <CardContent>
        {transaction?.events?.map((event, i) => (
          <Card
            sx={{
              mt: i !== 0 ? 2 : 0,
            }}
            key={event?.id}
          >
            <CardContent>
              <Stack mb={1} direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                <Typography variant="body1">Name: {event.name}</Typography>
                <Typography variant="body1">Block: {event.blockNumber}</Typography>
                <Typography variant="body1">
                  Contract: {truncateEthAddress(event.contractAddress)} (
                  {getObjectKeyByValue(contracts, event?.contractAddress)})
                </Typography>
                <WalletExplorerButton address={event?.txHash} truncateLength={8} />
              </Stack>

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
