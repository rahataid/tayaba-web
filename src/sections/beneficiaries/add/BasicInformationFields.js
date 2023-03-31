import { gender, phoneType } from '@config';
// form

import { Stack, Grid } from '@mui/material';
import { RHFSelect, RHFTextField } from '@components/hook-form';

export default function BasicInformatonFields({ methods, village, projects }) {
  console.log(projects);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFTextField id="name" name="name" label="Name" />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFTextField id="phone" name="phone" label="Phone Number" />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFTextField id="cnicNumber" name="cnicNumber" label="Cnic NUmber" />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFSelect name={'projectId'} label="Select Project">
            {' '}
            <option>Select Project</option>
            {projects
              ? projects?.map((obj) => (
                  <option key={obj.value} value={obj.value}>
                    {obj.label}
                  </option>
                ))
              : ''}
          </RHFSelect>
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFSelect name={'gender'} label="Select Gender">
            {' '}
            <option>Select Gender</option>
            {gender
              ? Object.keys(gender).map((obj) => (
                  <option key={obj} value={gender[obj]}>
                    {obj}
                  </option>
                ))
              : ''}
          </RHFSelect>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFSelect name="villageId" label="Select Village">
            {' '}
            <option>Select Village</option>
            {village
              ? village?.map((obj) => (
                  <option key={obj.value} value={obj.value}>
                    {obj.label}
                  </option>
                ))
              : ''}
          </RHFSelect>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFTextField id="phoneOwnedBy" name="phoneOwnedBy" label="Phone Ownership" />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFSelect name={'phoneType'} label="Select Phone Type">
            {' '}
            <option>Select Phone Type</option>
            {phoneType
              ? Object.keys(phoneType).map((obj) => (
                  <option key={obj} value={phoneType[obj]}>
                    {obj}
                  </option>
                ))
              : ''}
          </RHFSelect>
        </Stack>
      </Grid>
    </Grid>
  );
}
