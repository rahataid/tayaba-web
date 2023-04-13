// form
import { Controller } from 'react-hook-form';
// @mui
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Grid, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// components
import { RHFTextField } from '@components/hook-form';
import GithubProjectType from './GithubProjectType';

const BasicInformation = ({ methods }) => {
  const { control, formState: {
    errors, isSubmitting, isValid
  } } = methods;

  return (
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

      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={{ xs: 2, sm: 3 }} direction={{ xs: 'column', sm: 'row' }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Stack direction="column">

                    <DatePicker
                      {...field}
                      label="Start date"
                      inputFormat="MM/DD/YYYY"
                      renderInput={(params) => (
                        <TextField fullWidth {...params} error={error?.message} helperText={error?.message} />
                      )}

                    />
                    <Typography color="error" variant={'caption'}>
                      {error?.message}
                    </Typography>
                  </Stack>
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Stack direction="column">

                    <DatePicker
                      {...field}
                      label="End date"
                      inputFormat="MM/DD/YYYY"
                      renderInput={(params) => (
                        <TextField fullWidth {...params} error={error?.message} helperText={error?.message} />
                      )}

                    />
                    <Typography color="error" variant={'caption'}>
                      {error?.message}
                    </Typography>
                  </Stack>
                )}
              />
            </Stack>
          </LocalizationProvider>
        </Stack>
      </Grid>
      <GithubProjectType />
    </Grid>
  );
};
export default BasicInformation;
