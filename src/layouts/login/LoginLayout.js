import PropTypes from 'prop-types';
// @mui
import { Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';
import { APP_NAME } from '@config';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <StyledSection>
        <Typography variant="h1">Rahat</Typography>
        {/* <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || '/assets/images/rahat-logo.png'}
          sx={{ maxWidth: 240 }}
        /> */}

        <StyledSectionBg />
        <Stack spacing={3} sx={{ position: 'relative', zIndex: 9 }}>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: 480, textAlign: 'center' }}>
            Supporting vulnerable communities with a simple and efficient relief distribution platform powered by
            Blockchain.
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ position: 'absolute', bottom: 40, textAlign: 'center' }}>
          © 2022 Rumsan. All rights reserved
        </Typography>
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
