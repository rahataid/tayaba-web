// @mui
import { Divider, Stack, Typography } from '@mui/material';
// auth
// components

// ----------------------------------------------------------------------

export default function AuthWithWallet() {
  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          Do you use Rumsan Wallet? Click Here
        </Typography>
      </Stack>
    </div>
  );
}
