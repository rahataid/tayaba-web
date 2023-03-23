import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui

import { Stack, Grid, Button, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '@components/iconify';
import FormProvider, { RHFSelect, RHFCheckbox, RHFTextField } from '@components/hook-form';
import moment from 'moment';
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
export default function AddedInfo({ beneficaryInfo, setStep }) {
  const [defaultValues, setDefaultValues] = useState({
    walletAddress: '',
    community: '',
  });

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleAdd = async (data) => {
    try {
      console.log(data);
      await addBeneficiary({ ...beneficaryInfo, ...data });
      enqueueSnackbar('Added Beneficary');
      setStep(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateWallet = async () => {
    let wallet = Web3Utils.generateWallet();
    setDefaultValues({ walletAddress: wallet.address });
    setValue('walletAddress', wallet.address);
  };
  useEffect(() => {}, [defaultValues]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card>
          <Grid container padding={1} spacing={3}>
            <Grid item xs={12} md={9}>
              <Stack spacing={3}>
                <RHFTextField id="walletAddress" name="walletAddress" label="Wallet Address" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button onClick={handleCreateWallet}>Generate Wallet Address</Button>
            </Grid>
            <Grid item xs={12} md={12}>
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
