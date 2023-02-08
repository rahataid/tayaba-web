import PropTypes from 'prop-types';
import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { useVendorsContext } from '@contexts/vendors';
// import truncateEthAddress from '@utils/truncateEthAddress';
import { useAuthContext } from 'src/auth/useAuthContext';
import WalletExplorerButton from '@components/button/WalletExplorerButton';

BasicInfoCard.propTypes = {
  chainData: PropTypes.object,
};

export default function BasicInfoCard({ chainData }) {
  const { singleVendor } = useVendorsContext();
  const { roles } = useAuthContext();

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={12}>
          <Typography variant="h6">
            {roles.isDonor ? singleVendor?.name : singleVendor?.name?.substring(0, 1) + 'xxxxxxx Xxxxx'}
          </Typography>
          {
            <div>
              {chainData?.walletAddress && (
                <Chip
                  label={chainData?.isActive ? 'Approved' : 'Not Approved'}
                  color={chainData?.isActive ? 'success' : 'error'}
                />
              )}
            </div>
          }
        </Stack>

        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {singleVendor?.phone}
            </Typography>
            <Typography variant="body2">Phone</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{singleVendor?.gender}</Typography>
            <Typography variant="body2">Gender</Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              <WalletExplorerButton address={singleVendor?.walletAddress} type="address" />

              {/* </WalletExplorerButton> */}
            </Typography>
            <Typography variant="body2">Wallet Address</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
