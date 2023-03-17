import { useEffect } from 'react';
import { useProjectContext } from '@contexts/projects';
// form
import { Controller } from 'react-hook-form';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Stack, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// components
import { RHFSelect, RHFTextField } from '@components/hook-form';
import { useProject } from '@services/contracts/useProject';

const CommonFormFields = ({ methods }) => {
  const { projectsTypesList, getProjectsTypesList } = useProjectContext();

  const { control } = methods;

  useEffect(() => {
    getProjectsTypesList();
  }, [getProjectsTypesList]);

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
          <RHFSelect name={'projectsTypes'} label="Select Project Type">
            {' '}
            <option value="" />
            {projectsTypesList
              ? projectsTypesList?.map((obj) => (
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
};
export default CommonFormFields;
