import { RHFSelect, RHFTextField } from '@components/hook-form';
import FormProvider from '@components/hook-form/FormProvider';
import { gender, SPACING } from '@config';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Alert, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').min(4, 'Mininum 4 characters').max(24, 'Maximum 15 characters'),
  phone: Yup.string().required(),
  villageId: Yup.number().required(),
  gender: Yup.string().required('Gender is required'),
  bankAccount: Yup.string(),
  dailyDistanceCovered: Yup.number().required('Distance covered is required'),
});

export default function EditForm() {

  const {
    push,
    query: { beneficiaryId: walletAddress },
  } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { getAllVillages, village, updateUsingWalletAddress, getBeneficiaryByWalletAddress, singleBeneficiary } =
    useBeneficiaryContext();

  const methods = useForm({
    resolver: yupResolver(FormSchema),
  });

  const {
    formState: { errors, isSubmitting },
    reset,
    setError,
    handleSubmit,
  } = methods


  console.log(errors)


  useEffect(() => {
    if (!walletAddress) return
    getBeneficiaryByWalletAddress(walletAddress);
    getAllVillages();

  }, [getAllVillages, walletAddress]);

  useEffect(() => {
    if (!singleBeneficiary) return
    const benData = {
      name: singleBeneficiary?.data?.name,
      dailyDistanceCovered: singleBeneficiary?.data?.dailyDistanceCovered,
      villageId: singleBeneficiary?.data?.villageId,
      gender: singleBeneficiary?.data?.gender,
      bankAccount: singleBeneficiary?.data?.bankAccount,
      phone: singleBeneficiary?.data?.phone
    }
    reset(benData)
  }, [singleBeneficiary])

  const handleSubmitFunction = async (data) => {
    console.log(data)
    try {
      await updateUsingWalletAddress(walletAddress, data);
      enqueueSnackbar('Updated Beneficary');
      push(`/beneficiaries/${walletAddress}`);
    } catch (error) {
      console.log(error)
      setError('afterSubmit', {
        message: error?.message || "Validation Error Occured"
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleSubmitFunction)}>
      <Stack m={2}>{!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}</Stack>
      <Grid container spacing={SPACING.GRID_SPACING}>

        <Grid item xs={12} md={6} >
          <RHFTextField
            id="name"
            name="name"
            label="Name"
          />
        </Grid>

        <Grid item xs={12} md={6} >
          <RHFTextField
            id="phone"
            name="phone"
            label="Phone Number"
          />
        </Grid>

        <Grid item xs={12} md={6} >
          <RHFTextField
            id="bankAccount"
            name="bankAccount"
            label="Bank Account"
          />
        </Grid>

        <Grid item xs={12} md={6} >
          <RHFTextField
            id="dailyDistanceCovered"
            name="dailyDistanceCovered"
            label="Daily Distance Covered"
          />
        </Grid>

        <Grid item xs={12} md={6} >
          <RHFSelect name={'villageId'} label="Select Village">
            <option>Select Village</option>
            {village && (
              village.map((elem) => (
                <option key={elem.label} value={elem.value}>
                  {elem.label}
                </option>
              ))
            )
            }
          </RHFSelect>
        </Grid>

        <Grid item xs={12} md={6} >
          <RHFSelect
            name="gender"
            id="gender"
            label="Select Gender"
          >
            {gender
              ? Object.keys(gender).map((obj) => (
                <option value={gender[obj]} key={obj}>
                  {obj}
                </option>
              ))
              : ''}
          </RHFSelect>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6} >
        <LoadingButton loading={isSubmitting} variant="outlined" type="submit" onClick={handleSubmitFunction}>
          Update
        </LoadingButton>
      </Grid>

    </FormProvider>
  );
}
