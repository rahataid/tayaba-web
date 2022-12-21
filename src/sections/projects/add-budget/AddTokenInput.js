import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ButtonGroup, Grid, TextField } from '@mui/material';

const AddTokenInput = (props) => (
  <Box sx={{ m: 2 }}>
    <Grid container alignItems="flex-start" spacing={1}>
      <Grid item md={7}>
        <TextField fullWidth label="Enter number of token balance to be added" id="fullWidth" />
      </Grid>
      <Grid item md={2}>
        <Button variant="contained" sx={{ p: 2 }}>
          Add Token
        </Button>
      </Grid>
    </Grid>
  </Box>
);

AddTokenInput.propTypes = {};

export default AddTokenInput;
