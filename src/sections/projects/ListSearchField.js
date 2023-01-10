import { InputAdornment, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from '@components/iconify';

const ListSearchField = ({ label, placeholder, value, onChange, name, ...other }) => (
  <TextField
    fullWidth
    value={value}
    onChange={onChange}
    label={label}
    placeholder={placeholder}
    name={name}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
        </InputAdornment>
      ),
    }}
    {...other}
  />
);

ListSearchField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default ListSearchField;
