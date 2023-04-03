import { useVendorsContext } from '@contexts/vendors';
import { Alert, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// import truncateEthAddress from '@utils/truncateEthAddress';
import WalletExplorerButton from '@components/button/WalletExplorerButton';
import SendToken from './SendToken';

BasicInfoCard.propTypes = {
  chainData: PropTypes.object,
};

export default function BasicInfoCard({ chainData }) {
  const { singleVendor } = useVendorsContext();

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">{singleVendor?.name}</Typography>
          <SendToken />
        </Stack>
        {chainData?.pendingTokens > 0 && (
          <Alert sx={{ mt: 2 }} type="info">
            {' '}
            This distributor has yet to accept {chainData?.pendingTokens} tokens.
          </Alert>
        )}

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="subtitle" sx={{ fontWeight: 600 }}>
              {singleVendor?.phone}
            </Typography>
            <Typography variant="body2">Phone</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="subtitle" sx={{ fontWeight: 600 }}>
              <WalletExplorerButton address={singleVendor?.walletAddress} type="address" truncateLength={2} />
            </Typography>
            <Typography variant="body2">Wallet Address</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
