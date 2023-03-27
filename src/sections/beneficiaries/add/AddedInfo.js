// form
import { Stack, Grid, Typography, Card } from '@mui/material';
// components
import moment from 'moment';

// ----------------------------------------------------------------------

export default function AddedInfo({ beneficaryInfo = {} }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card>
          <Stack spacing={3} padding={1}>
            <Grid container spacing={3}>
              {Object.entries(beneficaryInfo).map(([key, value]) =>
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
  );
}
