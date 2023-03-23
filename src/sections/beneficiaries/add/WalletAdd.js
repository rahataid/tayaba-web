import { useState } from 'react';
import { Stack, Grid, Button, Card } from '@mui/material';
// components
import { RHFSelect, RHFCheckbox, RHFTextField } from '@components/hook-form';
import Web3Utils from '@utils/web3Utils';
import { useBeneficiaryContext } from '@contexts/beneficiaries';

// ----------------------------------------------------------------------

const community = [
  {
    label: 'Tayaba',
    value: 'tayaba',
  },
  {
    label: 'Rahat',
    value: 'rahat',
  },
];
export default function WalletAdd({ beneficaryInfo, setStep }) {
  const [walletAddress, setwalletAddress] = useState();

  const handleCreateWallet = async () => {
    let wallet = Web3Utils.generateWallet('');
    setwalletAddress(wallet.address);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card>
          <Grid container padding={1} spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={9}>
                  <Stack spacing={1}>
                    <RHFTextField
                      id="walletAddress"
                      value={walletAddress}
                      name="walletAddress"
                      label="Wallet Address"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="outlined" onClick={handleCreateWallet}>
                    Generate Wallet
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <RHFSelect name="community" label="Select Community">
                  {' '}
                  <option>Select Community</option>
                  {community
                    ? community?.map((obj) => (
                        <option key={obj.value} value={obj.value}>
                          {obj.label}
                        </option>
                      ))
                    : ''}
                </RHFSelect>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
