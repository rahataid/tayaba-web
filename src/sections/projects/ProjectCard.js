import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Stack, Typography } from '@mui/material';
// routes
// utils
// redux
// components
import Label from '@components/label';
import Image from '@components/image';
import moment from 'moment';

// ----------------------------------------------------------------------

ProjectCard.propTypes = {
  project: PropTypes.object,
};

export default function ProjectCard({ project }) {
  const { id, wallet, name, created_at, status, balance } = project;

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}

        <NextLink href={`projects/${wallet}`} passHref>
          <Image
            alt={name}
            src={'https://live.staticflickr.com/65535/52704625310_f17af896d5_b.jpg'}
            ratio="1/1"
            sx={{ borderRadius: 1.5 }}
          />
        </NextLink>
      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
        <NextLink href={`projects/${wallet}`} passHref>
          <Link color="inherit" variant="h6" noWrap>
            {name}
          </Link>
        </NextLink>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2">{moment(created_at).format('MMM DD, YYYY') || 'N/A'}</Typography>
          <Typography variant="body2"> {balance || '0'}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
