import * as Yup from 'yup';
import { useRef, useEffect, useState } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Stack, Grid, Button, TextField, Typography, IconButton, InputAdornment, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers';

// components
import FormProvider, { RHFEditor, RHFSelect, RHFTextField } from '@components/hook-form';
import AddedInfo from './AddedInfo';
// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').min(4, 'Mininum 4 characters').max(24, 'Maximum 15 characters'),
  startDate: Yup.date().nullable().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .nullable()
    .min(Yup.ref('startDate'), 'End date must be later than start date'),
  projectManager: Yup.string().required('Project Manager is required'),
  budget: Yup.number().required('Budget Is Required'),
});

export default function ProjectAdd() {
  const [defaultValues, setDefaultValues] = useState({
    name: '',
    location: '',
    projectManager: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
  });
  const [step, setStep] = useState(0);
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

  const onSubmit = async (data) => {
    setDefaultValues(data);
    setStep(1);
  };

  return (
    <>
      {step === 0 && (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <RHFTextField id="name" name="name" label="Name" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <RHFTextField id="location" name="location" label="Location" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <RHFTextField id="projectManager" name="projectManager" label="Project manager" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <RHFTextField id="description" name="description" label="Description" />
              </Stack>
            </Grid>

            <Grid item xs={12} md={12}>
              <Stack spacing={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={{ xs: 2, sm: 3 }} direction={{ xs: 'column', sm: 'row' }}>
                    <Controller
                      name="startDate"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DatePicker
                          {...field}
                          label="Start date"
                          inputFormat="MM/DD/YYYY"
                          renderInput={(params) => (
                            <TextField fullWidth {...params} error={!!error} helperText={error?.message} />
                          )}
                        />
                      )}
                    />

                    <Controller
                      name="endDate"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DatePicker
                          {...field}
                          label="End date"
                          inputFormat="MM/DD/YYYY"
                          renderInput={(params) => (
                            <TextField fullWidth {...params} error={!!error} helperText={error?.message} />
                          )}
                        />
                      )}
                    />
                  </Stack>
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <RHFTextField id="Budget" name="budget" label="Budget" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
              <RHFSelect name={'projectList'} label="Select Project">
                  {' '}
                  <option>Special Project</option>
                  <option>Crisis Response</option>
                  <option>UBI</option>
                  <option>Micro Loans</option>
                    
                </RHFSelect>
              </Stack>
            </Grid>
          </Grid>

          <LoadingButton
            sx={{ margin: 3 }}
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Next
          </LoadingButton>
        </FormProvider>
      )}
      {step === 1 && <AddedInfo projectInfo={defaultValues} setStep={setStep} />}
    </>
  );
}
