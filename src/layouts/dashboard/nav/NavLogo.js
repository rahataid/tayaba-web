// @mui
import { Stack, Typography } from '@mui/material';

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
      <Typography variant="subtitle1" color="grey">
        Rahat System
      </Typography>
      {/* <Box component="img" src="/logo/tayaba-logo.png" /> */}
    </Stack>
  );
}
