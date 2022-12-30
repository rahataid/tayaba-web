import PropTypes from 'prop-types';
// import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
// import { CustomSmallSelect } from '@components/custom-input';
import Chart, { useChart } from '@components/chart';

// ----------------------------------------------------------------------

BarchartSingle.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BarchartSingle({ title, subheader, chart, footer, ...other }) {
  let { colors, chartLabel, chartData, options } = chart;
if(!options){
   options={
    chart: {
      stacked: true,
    },
  };
}

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
