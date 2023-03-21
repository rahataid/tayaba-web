// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// componentsimport formFields from './data/formFields.json';

import FormProvider, { RHFSelect, RHFTextField } from '@components/hook-form';
import { useProjectContext } from '@contexts/projects';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function DynamicForm({ items = [] }) {

  const{getFormFields, formFields } = useProjectContext();

  useEffect(() => {
    getFormFields();
  }, [getFormFields]);

  const methods = useForm({
    mode: 'onTouched',
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const renderForms = (formItems) => {
    return formFields.map((item) => {
      switch (item.fieldType) {
        case 'number':
          return (
            <Grid item xs={12} md={6}>
              <RHFTextField id={item.name} name={item.name} label={item.label} required={item.required} />
            </Grid>
          );
        case 'string':
          return (
            <Grid item xs={12} md={6}>
              <RHFTextField id={item.name} name={item.name} label={item.label} required={item.required} />
            </Grid>
          );

        case 'select':
          return (
            <Grid item xs={12} md={6}>
              <RHFSelect name={item.name} label={item.label} required={item.required}>
                {' '}
                <option>`Select ${item.name}` </option>
                {item.options?.map((obj) => (
                  <option key={obj.value} value={obj.value}>
                    {obj.label}
                  </option>
                ))}
              </RHFSelect>
            </Grid>
          );

        case 'date':
          return (
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name={item.name}
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      label={item.lablel}
                      inputFormat="MM/DD/YYYY"
                      renderInput={(params) => (
                        <TextField fullWidth {...params} error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          );

        default:
          return;
      }
    });
  };

  const onSubmit = () => {};

  return (
    <Grid container spacing={3}>
      {renderForms(items)}
    </Grid>
  );
}
