import React from 'react';
import PropTypes from 'prop-types';
import {  CardContent, Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';

const MoreInfoCard = (props) => {
  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" paddingTop={4} paddingBottom={4}>
        <Stack sx={{ p: 0 }}>
          <Typography variant="body1">H20 Wheels Distribution</Typography>
        </Stack>
      </Grid>
  );
};

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
