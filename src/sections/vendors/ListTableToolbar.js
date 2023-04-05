import { Stack } from '@mui/material';
// components
import ListSearchField from './ListSearchField.js';
import ListSelectFilter from './SelectFilter';

// ----------------------------------------------------------------------

ListTableToolbar.propTypes = {};

export default function ListTableToolbar() {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 0 }}>
      <ListSelectFilter label={'Phone'} />
      <ListSelectFilter label={'Ward'} />
      <ListSearchField label={'Enter Phone'} />
    </Stack>
  );
}
