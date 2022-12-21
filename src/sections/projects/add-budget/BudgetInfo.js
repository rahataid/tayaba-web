import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Stack, Typography } from '@mui/material';

const BudgetInfo = (props) => {
  return (
    <Box>
      {' '}
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            110,000
          </Typography>
          <Typography variant="body2">Project Token</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="h4" sx={{ fontWeight: 400 }}>
            5
          </Typography>
          <Typography variant="body2">Available Token</Typography>
        </Grid>
      </Stack>
    </Box>
  );
};

BudgetInfo.propTypes = {};

export default BudgetInfo;
