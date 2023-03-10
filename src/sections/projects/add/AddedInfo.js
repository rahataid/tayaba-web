import * as Yup from 'yup';
import { useState, useRef } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Stack, Grid, Button, TextField, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFEditor, RHFSelect, RHFTextField } from '@components/hook-form';
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
export default function AddedInfo({ projectInfo, setStep }) {
  const [defaultValues, setDefaultValues] = useState({
    walletAddress: '',
  });
  const fileInputRef = useRef(null);
  const { addProject } = useProjectContext();
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    watch,
    reset,
    control,
    register,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const values = watch();
  const handleClickAttachPhoto = () => {
    fileInputRef.current?.click();
  };
  const handleFinish = async (data) => {
    try {
      await addProject({ ...data, ...projectInfo });
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
  //   useLayoutEffect(() => {}, [projectInfo]);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <FormProvider methods={methods} onSubmit={handleSubmit(handleFinish)}>
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
                <Grid item xs={12} md={12}>
                  <Button sx={{ margin: 1 }} color="primary" size="large" variant="outlined" onClick={() => setStep(0)}>
                    Previous
                  </Button>
                  <LoadingButton
                    sx={{ margin: 1 }}
                    color="primary"
                    size="large"
                    type="submit"
                    variant="outlined"
                    loading={isSubmitting}
                  >
                    Add
                  </LoadingButton>
                </Grid>
              </Grid>
            </FormProvider>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
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
