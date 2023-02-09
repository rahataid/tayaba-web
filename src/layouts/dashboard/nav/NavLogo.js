// @mui
import { Stack, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function NavUnicefLogo() {
  return (
    <Stack
      spacing={3}
      sx={{
        px: 7,
        pb: 5,
        textAlign: 'center',
        marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'relative',
        bottom: 0,
      }}
    >
      <Box component="img" src="/logo/tayaba-logo.png" />
    </Stack>
  );
}
