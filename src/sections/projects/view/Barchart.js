import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader,Box  } from '@mui/material';
// utils
import { fNumber } from '@utils/formatNumber';
// components
import Chart, { useChart } from '@components/chart';

// ----------------------------------------------------------------------

Barchart.propTypes = {
    chart: PropTypes.object,
    title: PropTypes.string,
    subheader: PropTypes.string,
  };



export default function Barchart({ title, subheader, footer,chart, ...other }) {
    const theme = useTheme();

  const { chartLabel,chartData,  } = chart;
  const colors =[
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.error.main,
    theme.palette.warning.main,
  ];
  const options={
    chart: {
      stacked: true,
    },
  };
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
