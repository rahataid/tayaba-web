import { useEffect } from 'react';
import * as Yup from 'yup';
// form
// @mui
import { Card, Grid, Stack } from '@mui/material';
// components
import { RHFTextField } from '@components/hook-form';
import { useProjectContext } from '@contexts/projects';
import moment from 'moment';
const community = [];
// ----------------------------------------------------------------------
const FormSchema = Yup.object().shape({
  walletAddress: Yup.string()
    .required('Contract Addressis required')
    .min(4, 'Mininum 4 characters')
    .max(100, 'Maximum 15 characters'),
  //   walletAddress: Yup.string().required('Wallet Address is required'),
});
export default function AddedInfo({ projectInfo = {}, projectType }) {
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
            <Stack spacing={3} padding={6}>
              <Grid container spacing={5}>
                {Object.entries(projectInfo[0]).map(([key, value]) =>
                  value instanceof Date ? (
                    <Grid item xs={12} md={3} key={`${key}-${value}`}>
                      <RHFTextField
                        id={key}
                        name={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={moment(value).format('DD MMM YYYY')}
                        disabled={true}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} md={6} key={`${key}-${value}`}>
                      <RHFTextField
                        id={key}
                        name={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                        disabled={true}
                      />
                    </Grid>
                  )
                )}
                {Object.entries(projectInfo[1]?.extras).map(([key, value]) =>
                  value instanceof Date ? (
                    <Grid key={`${key}-${value}`} item xs={12} md={3}>
                      <RHFTextField
                        id={key}
                        name={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={moment(value).format('DD MMM YYYY')}
                        disabled={true}
                      />
                    </Grid>
                  ) : (
                    <Grid key={`${key}-${value}`} item xs={12} md={6}>
                      <RHFTextField
                        id={key}
                        name={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                        disabled={true}
                      />
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
