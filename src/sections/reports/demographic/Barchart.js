import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
// import { CustomSmallSelect } from '@components/custom-input';
import Chart, { useChart } from '@components/chart';

// ----------------------------------------------------------------------

Barchart.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function Barchart({ title, subheader, chart, footer, ...other }) {
  const { colors, chartLabel, chartData, options } = chart;

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories: chartLabel,
    },

    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      {footer}

      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <Chart type={'bar'} series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
