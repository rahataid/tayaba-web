import { useEffect, useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';
import WardGenderInfoCard from './WardGenderInfoCard';
import WardDailyWageInfoCard from './WardDailyWageInfoCard';
import WardLandOwnershipInfoCard from './WardLandOwnershipInfoCard';
import WardDisabilityInfoCard from './WardDisabilityInfoCard';

function WardWiseReport() {
  const theme = useTheme();

  const { getTransactionsCountByWard, wardChartData } = useModuleContext();
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    getTransactionsCountByWard();
  }, [getTransactionsCountByWard]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        {/* TODO: 

        More details in ward 
          // Claim count of beneficiaries by ward (isClaimed and total beneficiaries)

           - TOtal Beneficiaeris
           - no. of ben that claimed
            - no. of ben that not claimed
             chanrt 2 - male females
        */}
        <BarchartSingle
          title="Ward Wise Claims"
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.info.main,
              theme.palette.error.main,
              theme.palette.warning.main,
            ],
            options: {
              chart: {
                selection: {
                  enabled: true,
                },
                stacked: true,
                events: {
                  click: (event, chartContext, config) => {
                    let wardKey = String(wardChartData.chartLabel[config.dataPointIndex]?.slice(5));

                    setSelectedWard(wardKey);
                  },
                },
              },
            },
            ...wardChartData,
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <WardGenderInfoCard selectedWard={selectedWard} />
      </Grid>
      <Grid item xs={12} md={4}>
        <WardDailyWageInfoCard selectedWard={selectedWard} />
      </Grid>
      <Grid item xs={12} md={4}>
        <WardLandOwnershipInfoCard selectedWard={selectedWard} />
      </Grid>
      <Grid item xs={12} md={4}>
        <WardDisabilityInfoCard selectedWard={selectedWard} />
      </Grid>
    </Grid>
  );
}

WardWiseReport.propTypes = {};

export default WardWiseReport;
