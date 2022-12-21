import { InputAdornment, TextField } from '@mui/material';
import PropTypes from 'prop-types';
// import { useModuleContext } from '../context';
import Iconify from '@components/iconify';

const ListSearchField = ({ label = '' }) => {
  //   const { filter, setListFilter } = useModuleContext();

  //   const onSearchText = (e) => {
  //     setListFilter('searchText', e.target.value);
  //   };

  return (
    <TextField
      fullWidth
      value={''}
      onChange={() => {}}
      label={label}
      type="search"
      // InputProps={{
      //   startAdornment: (
      //     <InputAdornment position="start">
      //       <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
      //     </InputAdornment>
      //   ),
      // }}
    />
  );
};

ListSearchField.propTypes = {
  label: PropTypes.string,
};

export default ListSearchField;
