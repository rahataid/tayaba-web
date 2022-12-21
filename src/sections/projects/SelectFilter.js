import { MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const ListSelectFilter = ({ label }) => {
  return (
    <TextField
      fullWidth
      select
      label={label}
      value={'s'}
      onChange={() => {}}
      SelectProps={{
        MenuProps: {
          sx: { '& .MuiPaper-root': { maxHeight: 260 } },
        },
      }}
      sx={{
        maxWidth: { sm: 240 },
        textTransform: 'capitalize',
      }}
    >
      {[].map((option) => (
        <MenuItem
          key={option.id}
          value={option.tag}
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
          }}
        >
          {option.tag}
        </MenuItem>
      ))}
    </TextField>
  );
};

ListSelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
};

export default ListSelectFilter;
