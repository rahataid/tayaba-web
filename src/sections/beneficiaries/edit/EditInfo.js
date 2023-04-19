import { gender } from '@config';
import { useBeneficiaryContext } from '@contexts/beneficiaries';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').min(4, 'Mininum 4 characters').max(24, 'Maximum 15 characters'),
  phone: Yup.number().optional(),
  villageId: Yup.number(),
  gender: Yup.number().required('Gender is required'),
  bankAccount: Yup.string(),
  dailyDistanceCovered: Yup.number().required('Distance covered is required'),
});

export default function EditForm() {
  const [loading, setLoading] = useState(false);

  const {
    push,
    query: { beneficiaryId: walletAddress },
  } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const { getAllVillages, village, updateUsingWalletAddress, getBeneficiaryByWalletAddress, singleBeneficiary } =
    useBeneficiaryContext();
  const beneficiarySchema = {
    dailyDistanceCovered: Yup.number().required('Email is required'),
  };
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(beneficiarySchema),
  });
  const [beneficary, setBeneficary] = useState({
    name: '',
    phone: '',
    villageId: '',
    gender: '',
    bankAccount: '',
    dailyDistanceCovered: '',
  });

  const init = useCallback(async () => {
    if (!walletAddress) return;
    await getBeneficiaryByWalletAddress(walletAddress);
  }, [walletAddress]);

  useEffect(() => {
    getAllVillages();
  }, [getAllVillages]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!singleBeneficiary || !singleBeneficiary.data) return;
    setBeneficary({
      name: singleBeneficiary?.data?.name,
      phone: singleBeneficiary?.data?.phone,
      villageId: singleBeneficiary?.data?.villageId,
      dailyDistanceCovered: singleBeneficiary?.data?.dailyDistanceCovered,
      gender: singleBeneficiary?.data?.gender,
      bankAccount: singleBeneficiary?.data?.bankAccount,
    });
  }, [singleBeneficiary]);

  const handleInputChange = (e) => {
    setBeneficary((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitFunction = async () => {
    try {
      setLoading(true);
      await updateUsingWalletAddress(walletAddress, beneficary);
      enqueueSnackbar('Updated Beneficary');
      setLoading(false);
      push(`/beneficiaries/${walletAddress}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      autoComplete="no"
      sx={{ p: 2, alignItems: 'center', m: 3 }}
      noValidate
      onSubmit={handleSubmit(handleSubmitFunction)}
    >
      <Grid container>
        <Grid item xs={12} md={6} padding={2} spacing={1}>
          <FormControl fullWidth>
            <TextField
              id="name"
              name="name"
              label="Name"
              required
              onChange={handleInputChange}
              value={beneficary?.name}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} padding={2} spacing={1}>
          <FormControl fullWidth>
            <TextField
              id="phone"
              name="phone"
              label="Phone Number"
              onChange={handleInputChange}
              value={beneficary?.phone}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} padding={2} spacing={1}>
          <FormControl fullWidth>
            <TextField
              id="bankAccount"
              name="bankAccount"
              label="Bank Account"
              onChange={handleInputChange}
              value={beneficary?.bankAccount}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} padding={2} spacing={1}>
          <FormControl fullWidth>
            <TextField
              id="dailyDistanceCovered"
              required
              error={!!errors['dailyDistanceCovered']}
              helperText={errors['dailyDistanceCovered'] ? errors['dailyDistanceCovered'].message : ''}
              name="dailyDistanceCovered"
              label="Daily Distance Covered"
              onChange={handleInputChange}
              value={beneficary?.dailyDistanceCovered}
              {...register('dailyDistanceCovered')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} padding={2} spacing={1}>
          <FormControl fullWidth>
            <InputLabel variant="standard" color="" sx={{ paddingLeft: 2 }}>
              Village
            </InputLabel>
            <Select
              id="villageId"
              name="villageId"
              label=" Select Village"
              onChange={handleInputChange}
              value={beneficary?.villageId}
            >
              {village ? (
                village.map((elem) => (
                  <MenuItem key={elem.label} value={elem.value}>
                    {elem.label}
                  </MenuItem>
                ))
              ) : (
                <></>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} padding={2} spacing={1}>
          <FormControl fullWidth>
            <InputLabel padding={2} variant="standard" sx={{ paddingLeft: 2 }}>
              Gender
            </InputLabel>
            <Select
              name="gender"
              id="gender"
              label=" Select Gender"
              onChange={handleInputChange}
              value={beneficary?.gender}
            >
              {gender
                ? Object.keys(gender).map((obj) => (
                  <MenuItem value={gender[obj]} key={obj}>
                    {obj}
                  </MenuItem>
                ))
                : ''}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} padding={2} spacing={1}>
        <LoadingButton loading={loading} variant="outlined" type="submit" onClick={handleSubmitFunction}>
          Update
        </LoadingButton>
      </Grid>
    </Box>
  );
}
