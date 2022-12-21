import React from 'react';
import PropTypes from 'prop-types';
import SummaryCard from '@components/SummaryCard';
import { Grid } from '@mui/material';

function SummaryCards(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard title={'Beneficiaries Claimed'} total={1000} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard title={'Children Impacted'} total={200} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard title={'QR Distributed'} total={100} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard title={'SMS of Token Assignment sent'} total={52} />
      </Grid>
    </Grid>
  );
}

SummaryCards.propTypes = {};

export default SummaryCards;
