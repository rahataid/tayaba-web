import * as Yup from 'yup';
import { useState, useRef } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Stack, Grid, Button, TextField, Typography, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFEditor, RHFCheckbox, RHFTextField } from '@components/hook-form';
import { useProjectContext } from '@contexts/projects';
import moment from 'moment';
import Web3Utils from '@utils/web3Utils';
import Iconify from '@components/iconify';
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
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Stack spacing={3}>
                    <RHFTextField id="walletAddress" name="walletAddress" label="Wallet Address" />
                    <Button onClick={handleCreateWallet}>Generate Wallet Address</Button>
                    <div>
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <Button
                          color="warning"
                          variant="contained"
                          onClick={handleClickAttachPhoto}
                          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                        >
                          Upload photo
                        </Button>
                        <div>
                          {values.photo?.name && <Typography variant="subtitle2">{values.photo.name}</Typography>}
                          {values.photo?.size && (
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {values.photo.size}
                            </Typography>
                          )}
                        </div>
                        <input
                          {...register('photo')}
                          ref={fileInputRef}
                          type="file"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            setValue('photo', file);
                          }}
                          style={{ display: 'none' }}
                        />
                      </Stack>
                      {!!errors?.photo && (
                        <FormHelperText sx={{ px: 2, display: 'block' }} error>
                          {errors?.photo?.message}
                        </FormHelperText>
                      )}
                    </div>
                  </Stack>
                  <Button
                    sx={{ margin: 3 }}
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={() => setStep(0)}
                  >
                    Previous
                  </Button>
                  <LoadingButton
                    sx={{ margin: 3 }}
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
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
          <Card sx={{ backfaceVisibility: 3 }}>
            <Stack spacing={3} padding={1}>
              {Object.entries(projectInfo).map(([key, value]) =>
                value instanceof Date ? (
                  <Typography paddingLeft={2}>
                    {' '}
                    {key.charAt(0).toUpperCase() + key.slice(1)} : {moment(value).toLocaleString()}
                  </Typography>
                ) : (
                  <Typography paddingLeft={2}>
                    {' '}
                    {key.charAt(0).toUpperCase() + key.slice(1)} : {value}
                  </Typography>
                )
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}