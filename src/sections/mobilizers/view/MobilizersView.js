import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import MoreInfoCard from './MoreInfoCard';
import { useMobilizerContext } from '@contexts/mobilizers';
import { useRouter } from 'next/router';

const MobilizerView = () => {
  const { getByMobilizerId } = useMobilizerContext();
  const {
    query: { mobilizerId },
  } = useRouter();

  useEffect(() => {
    getByMobilizerId(mobilizerId);
  }, [getByMobilizerId, mobilizerId]);

  return (
    <>
      {' '}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BasicInfoCard />
        </Grid>
      </Grid>
      <Stack>
        <MoreInfoCard />
      </Stack>
    </>
  );
};

MobilizerView.propTypes = {};

export default MobilizerView;
