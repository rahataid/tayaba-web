import WalletExplorerButton from '@components/button/WalletExplorerButton';
import Scrollbar from '@components/scrollbar';
import { Box, Card, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import TableHeadCustom from './TableHeadCustom';

ListTable.propTypes = {
  size: PropTypes.string,
  tableRowsList: PropTypes.array,
  tableHeadersList: PropTypes.object.isRequired,
  children: PropTypes.func,
  footer: PropTypes.node,
  errorMessage: PropTypes.node,
};

export default function ListTable({
  size = 'small',
  tableRowsList = [{ basic: 'Initial Table' }],
  tableHeadersList = {
    basic: {
      id: 'basic',
      label: 'basic',
      align: 'left',
    },
  },
  children,
  errorMessage,
  footer,
  ...other
}) {
  const conditionalRendering = (row, key) => {
    switch (key) {
      case 'txHash':
        return <WalletExplorerButton address={row} type="tx" />;
      case 'timestamp':
        return moment.unix(row).fromNow();
      case 'createdAt':
        return moment(row).fromNow();
      default:
        return row;
    }
  };

  const renderTableCell = (list, head) =>
    list.map((listItem, index) => (

      <TableRow hover key={listItem.id ?? index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        {Object.keys(head).map((headerKey) => {
          const tableKeyId = head[headerKey].id

          return (
            <TableCell align={head[headerKey]?.align} component="th" scope="row" key={tableKeyId}>
              {listItem[tableKeyId] ? conditionalRendering(listItem[tableKeyId], tableKeyId) : '-'}
            </TableCell>
          );
        })}
      </TableRow>
    ));

  return (
    <Box>
      <Card>
        <TableContainer {...other}>
          {errorMessage && <div>{errorMessage}</div>}
          <Scrollbar>
            <Table size={size} stickyHeader {...other}>
              <TableHeadCustom headLabel={tableHeadersList} />
              <TableBody>
                {children
                  ? children(tableRowsList, tableHeadersList)
                  : renderTableCell(tableRowsList, tableHeadersList)}
              </TableBody>
            </Table>
          </Scrollbar>
          {footer}
        </TableContainer>
      </Card>
    </Box>
  );
}
