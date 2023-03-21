import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Grid, Button, Typography, Card } from '@mui/material';
// components
import FormProvider, { RHFSelect, RHFTextField } from '@components/hook-form';
import { useProjectContext } from '@contexts/projects';
import moment from 'moment';
import Web3Utils from '@utils/web3Utils';
const community = [];
// ----------------------------------------------------------------------
const FormSchema = Yup.object().shape({
  walletAddress: Yup.string()
    .required('Contract Addressis required')
    .min(4, 'Mininum 4 characters')
    .max(100, 'Maximum 15 characters'),
  //   walletAddress: Yup.string().required('Wallet Address is required'),
});
export default function AddedInfo({ projectInfo = {}, projectType, setStep }) {
  const { getContracts } = useProjectContext();
  useEffect(() => {
    if (!projectType) return;
    getContracts(projectType);
  }, [projectType]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <Stack spacing={3} padding={1}>
              <Grid container spacing={3}>
                {Object.entries(projectInfo).map(([key, value]) =>
                  value instanceof Date ? (
                    <Grid item xs={12} md={6}>
                      <Typography paddingLeft={2} variant="h5">
                        {' '}
                        {moment(value).format('DD MMM YYYY')}
                      </Typography>
                      <Typography paddingLeft={2} variant="body">
                        {' '}
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid item xs={12} md={6}>
                      <Typography paddingLeft={2} variant="h5">
                        {' '}
                        {value}
                      </Typography>
                      <Typography paddingLeft={2} variant="body">
                        {' '}
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Typography>
                    </Grid>
                  )
                )}
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
