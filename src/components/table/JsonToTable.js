import Scrollbar from '@components/scrollbar';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

const JsonToTable = ({ json = {} }) => {
  const renderTable = (obj) => (
    <TableContainer component={Paper}>
      <Table size={'small'} hover>
        <TableHead>
          <TableRow>
            {Object.keys(obj).map((key) => (
              <TableCell key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {Object.values(obj).map((value) => {
              if (typeof value === 'object' && value !== null) {
                return <TableCell key={JSON.stringify(value)}>{renderTable(value)}</TableCell>;
              } else {
                return <TableCell key={value}>{value}</TableCell>;
              }
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <TableContainer component={Paper}>
      <Scrollbar>
        <Table size="small">
          <TableHead>
            <TableRow>
              {Object.keys(json).map((key) => (
                <TableCell key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.values(json).map((value) => {
                if (typeof value === 'object' && value !== null) {
                  return <TableCell key={JSON.stringify(value)}>{renderTable(value)}</TableCell>;
                } else {
                  return <TableCell key={value}>{value}</TableCell>;
                }
              })}
            </TableRow>
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
};

JsonToTable.propTypes = {
  json: PropTypes.object.isRequired,
};

export default JsonToTable;
