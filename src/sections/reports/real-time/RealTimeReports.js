import React from 'react';
import PropTypes from 'prop-types';
import SummaryCard from '@components/SummaryCard';
import { Box } from '@mui/material';
import SummaryCards from './SummaryCards';

const RealTimeReports = (props) => {
  return (
    <Box>
      <SummaryCards />
    </Box>
  );
};

RealTimeReports.propTypes = {};

export default RealTimeReports;
