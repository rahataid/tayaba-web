import { useEffect, useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';
import VillageGenderInfoCard from './VillageGenderInfoCard';
import VillagePhoneTypeInfoCard from './VillagePhoneTypeInfoCard';
import VillagePhoneOwnershipInfoCard from './VillagePhoneOwnershipInfoCard';
import VillageInternetAccessInfoCard from './VillageInternetAccessInfoCard';

function VillageWiseReport() {
  const theme = useTheme();
  const { getTransactionsClaimByVillage, wardChartData } = useModuleContext();
  const [selectedVillage, setSelectedVillage] = useState('');

  useEffect(() => {
    getTransactionsClaimByVillage();
  }, [getTransactionsClaimByVillage]);

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
          title="Distribution Point Wise Claims vs Assigned"
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
                    let VillageId = String(wardChartData.chartLabel[config.dataPointIndex]);

                    setSelectedVillage(VillageId);
                  },
                },
              },
            },
            ...wardChartData,
          }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <VillageGenderInfoCard selectedVillage={selectedVillage} />
      </Grid>
      <Grid item xs={12} md={4}>
        <VillagePhoneTypeInfoCard selectedVillage={selectedVillage} />
      </Grid>
      <Grid item xs={12} md={4}>
        <VillagePhoneOwnershipInfoCard selectedVillage={selectedVillage} />
      </Grid>
      <Grid item xs={12} md={4}>
        <VillageInternetAccessInfoCard selectedVillage={selectedVillage} />
      </Grid>
    </Grid>
  );
}

VillageWiseReport.propTypes = {};

export default VillageWiseReport;
