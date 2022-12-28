// @mui
import { Stack, Typography } from '@mui/material';
// hooks
// layouts
import LoginLayout from '@layouts/login';
//
import AuthLoginForm from './AuthLoginForm';

import Image from '@components/image';
import { APP_NAME } from '@config';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mb: 5, p: 2 }}>
        <Typography variant="h4" component="h1" sx={{ color: 'common.white' }}>
          {APP_NAME}
        </Typography>
        {/* <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={'/assets/images/unicef-logo-white.png'}
          sx={{ width: 120 }}
        /> */}
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}
