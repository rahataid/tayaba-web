import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
// import { useModuleContext } from '../context';

const ListSearchField = ({ label = '', ...others }) => (
  <TextField fullWidth value={''} label={label} type="search" {...others} />
);

ListSearchField.propTypes = {
  label: PropTypes.string,
};

export default ListSearchField;
