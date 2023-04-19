// import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
// components
import ListSearchField from '../../ListSearchField';
// import ListSelectFilter from './SelectFilter';
import { SPACING } from '@config';
import { useProjectContext } from '@contexts/projects';
import { useAuthContext } from 'src/auth/useAuthContext';
import BulkAdd from './BulkAdd';

// ----------------------------------------------------------------------

ListTableToolbar.propTypes = {};

export default function ListTableToolbar({ selectedBeneficiaries }) {
  const { filter, setFilter } = useProjectContext();
  const { roles } = useAuthContext();

  const onSearch = (e) => {
    const { name, value } = e.target;
    if (!value) setFilter(null);
    else setFilter({ [name]: value });
  };

  return (
    <>
      <Stack>
        {filter && Object?.keys(filter).length > 0 && (
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              mb: 1,

              '& span:not(:last-of-type)::after': {
                content: '"|"',
                mx: 1,
              },

              '& span:last-of-type': {
                mx: 0.5,
              },
            }}
          >
            {Object.keys(filter).map((key) => (
              <span key={key}>
                Searching by "{key}" : {filter[key]}{' '}
              </span>
            ))}
          </Typography>
        )}
      </Stack>

      <Stack
        spacing={SPACING.GRID_SPACING}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ py: 2.5, px: 0 }}
        justifyContent={'center'}
      >
        <ListSearchField label={'Enter Phone'} value={filter?.phone || ''} onChange={onSearch} name={'phone'} />
        <ListSearchField label={'Enter Name'} value={filter?.name || ''} onChange={onSearch} name={'name'} />

        <Box
          sx={{
            width: '25%',
          }}
        >
          <BulkAdd selectedBeneficiaries={selectedBeneficiaries} />
        </Box>
      </Stack>
    </>
  );
}
