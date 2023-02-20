import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link, Tooltip, Typography } from '@mui/material';
import { APP_NAME } from '@config';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Tooltip title={APP_NAME}>
      <Box component="img" src="/logo/rahat-logo.png" sx={{ width: 164, height: 'auto', cursor: 'pointer', ...sx }} />
    </Tooltip>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <NextLink href="/" passHref>
      <Link sx={{ display: 'contents' }}>{logo}</Link>
    </NextLink>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
