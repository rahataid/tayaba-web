// import PropTypes from 'prop-types';
import { Stack, Typography, Button } from '@mui/material';
// components
import ListSearchField from './ListSearchField.js';
import ListSelectFilter from './SelectFilter';
import { useBeneficiaryContext } from '@contexts/beneficiaries.js';

// ----------------------------------------------------------------------

ListTableToolbar.propTypes = {};

const statusOptions = [
  {
    label: 'Activated',
    value: 'true',
  },
  {
    label: 'Not Activated',
    value: 'false',
  },
];

const tokenAssignOptions = [
  {
    label: 'Assigned',
    value: 'true',
  },
  {
    label: 'Not Assigned',
    value: 'false',
  },
];

const tokenClaimOptions = [
  {
    label: 'Claimed',
    value: 'true',
  },
  {
    label: 'Not Claimed',
    value: 'false',
  },
];

export default function ListTableToolbar() {
  const { filter, setFilter, village } = useBeneficiaryContext();

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

      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 0 }} justifyContent={'flex-end'}>
        <ListSelectFilter
          label={'Village'}
          name={'village'}
          options={village}
          onSelectChange={onSearch}
          value={filter?.village || ''}
        />
        <ListSelectFilter
          label={'Status'}
          name={'isActivated'}
          options={statusOptions}
          onSelectChange={onSearch}
          value={filter?.isActivated || ''}
        />
        <ListSelectFilter
          label={'Token Assigned Status'}
          name={'tokensAssigned'}
          options={tokenAssignOptions}
          onSelectChange={onSearch}
          value={filter?.tokensAssigned || ''}
        />
        <ListSelectFilter
          label={'Token Claimed Status'}
          name={'tokensClaimed'}
          options={tokenClaimOptions}
          onSelectChange={onSearch}
          value={filter?.tokensClaimed || ''}
        />
        <ListSearchField label={'Enter Phone'} value={filter?.phone || ''} onChange={onSearch} name={'phone'} />
      </Stack>
    </>
  );
}
