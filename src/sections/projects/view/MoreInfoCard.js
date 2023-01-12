import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';

const MoreInfoCard = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      paddingTop={4}
      paddingBottom={4}
    >
      <Stack sx={{ p: 0 }}>
        {/* TODO: fetch it from server */}
        <Typography variant="body1">{'H20 Wheels Distribution'}</Typography>
      </Stack>
    </Grid>
  );
};

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
