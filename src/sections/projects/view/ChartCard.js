import React from 'react';
import PropTypes from 'prop-types';
import Piechart from './Piechart';
import { useTheme } from '@mui/material';

const ChartCard = ({ rahatChainData }) => {
  const theme = useTheme();
  return (
    <div>
      <Piechart
        title="Claim Token Balance"
        chart={{
          colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.warning.main,
          ],
          series: [
            { label: 'Available Tokens', value: rahatChainData?.tokenBalance || 0 },
            { label: 'Issued Tokens', value: rahatChainData?.totalBudget - rahatChainData?.tokenBalance || 0 },
          ],
        }}
      />
    </div>
  );
};

ChartCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default ChartCard;
