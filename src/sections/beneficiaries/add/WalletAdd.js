import { Button, Grid, Stack } from '@mui/material';
import { useState } from 'react';
// components
import { RHFSelect, RHFTextField } from '@components/hook-form';
import Web3Utils from '@utils/web3Utils';

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
export default function WalletAdd({ setValue, projects }) {
  const [walletAddress, setwalletAddress] = useState('');
  const handleCreateWallet = async () => {
    let wallet = Web3Utils.generateWallet('');
    setwalletAddress(wallet.address);
    setValue('walletAddress', wallet.address);
  };

  return (
    <Grid container padding={1} spacing={3}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Stack spacing={1}>
              <RHFTextField id="walletAddress" value={walletAddress} name="walletAddress" label="Wallet Address" />
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
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFSelect name={'projectId'} label="Select Project">
            {' '}
            <option>Select Project</option>
            {projects
              ? projects?.map((obj) => (
                  <option key={obj.value} value={obj.value}>
                    {obj.label}
                  </option>
                ))
              : ''}
          </RHFSelect>
        </Stack>
      </Grid>
    </Grid>
  );
}
