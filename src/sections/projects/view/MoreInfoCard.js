import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { useProjectContext } from '@contexts/projects';

const MoreInfoCard = () => {
  const { singleProject } = useProjectContext();

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
        <Typography variant="body1">{singleProject?.data?.description}</Typography>
      </Stack>
    </Grid>
  );
};

MoreInfoCard.propTypes = {};

export default MoreInfoCard;
