import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

const JsonToTable = ({ json = {} }) => {
  const renderTable = (obj) => (
    <Table>
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
  );

  return (
    <Table>
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
  );
};

JsonToTable.propTypes = {
  json: PropTypes.object.isRequired,
};

export default JsonToTable;
