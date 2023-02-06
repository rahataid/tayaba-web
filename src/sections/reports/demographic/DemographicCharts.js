import React, { useCallback, useEffect } from 'react';
import { Grid, Skeleton, useTheme } from '@mui/material';
import Barchart from './Barchart';
import { useReportsContext } from '@contexts/reports';
import { SPACING } from '@config';
import { useState } from 'react';
import Piechart from '@components/chart/Piechart';

const LoadingScreen = () => (
  <Grid container spacing={SPACING.GRID_SPACING}>
    <Grid item xs={12} md={6} lg={6}>
      <Skeleton variant="rectangular" height={200} />
    </Grid>
    <Grid item xs={12} md={6} lg={6}>
      <Skeleton variant="rectangular" height={200} />
    </Grid>
    <Grid item xs={12} md={6} lg={6}>
      <Skeleton variant="rectangular" height={200} />
    </Grid>
    <Grid item xs={12} md={6} lg={6}>
      <Skeleton variant="rectangular" height={200} />
    </Grid>
  </Grid>
);

function DemographicCharts() {
  const theme = useTheme();
  const [loadingGraph, setLoadingGraph] = useState(true);
  const { demographicReportData, getDemographicDataByWard, groupingData, getGroupingData } = useReportsContext();

  const fetchData = useCallback(async () => {
    await getGroupingData();
    await getDemographicDataByWard({
      filterKey: 'noLand',
    });
    await getDemographicDataByWard({
      filterKey: 'hasPhone',
    });
    await getDemographicDataByWard({
      filterKey: 'hasBank',
    });
    await getDemographicDataByWard({
      filterKey: 'dailyWage',
    });
    await getDemographicDataByWard({
      filterKey: 'disability',
    });
    setLoadingGraph(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // if (loadingGraph) {
  //   return <LoadingScreen />;
  // }

  return (
    <Grid container spacing={SPACING.GRID_SPACING}>
      <Grid item xs={12} md={2.4}>
        <Piechart
          title="Has Bank"
          chart={{
            colors: [
              theme.palette.primary.light,
              theme.palette.success.light,
              theme.palette.warning.light,
              theme.palette.error.light,
            ],

            series: groupingData?.hasBank,
          }}
        />
      </Grid>
      <Grid item xs={12} md={2.4}>
        <Piechart
          title="Has Phone"
          chart={{
            colors: [
              theme.palette.primary.light,
              theme.palette.success.light,
              theme.palette.warning.light,
              theme.palette.error.light,
            ],

            series: groupingData?.hasPhone,
          }}
        />
      </Grid>
      <Grid item xs={12} md={2.4}>
        <Piechart
          title="Daily Wage"
          chart={{
            colors: [
              theme.palette.primary.light,
              theme.palette.success.light,
              theme.palette.warning.light,
              theme.palette.error.light,
            ],

            series: groupingData?.dailyWage,
          }}
        />
      </Grid>
      <Grid item xs={12} md={2.4}>
        <Piechart
          title="Land Owner"
          chart={{
            colors: [
              theme.palette.primary.light,
              theme.palette.success.light,
              theme.palette.warning.light,
              theme.palette.error.light,
            ],

            series: groupingData?.landOwner,
          }}
        />
      </Grid>
      <Grid item xs={12} md={2.4}>
        <Piechart
          title="Disability"
          chart={{
            colors: [
              theme.palette.primary.light,
              theme.palette.success.light,
              theme.palette.warning.light,
              theme.palette.error.light,
            ],

            series: groupingData?.disability,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Land Ownership"
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.warning.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.noLand,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Phone Ownership"
          filterKey={'hasPhone'}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.error.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.hasPhone,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Bank Account"
          filterKey={'hasBank'}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.warning.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.hasBank,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Daily Wage"
          filterKey={'dailyWage'}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.error.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.dailyWage,
          }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Barchart
          title="Disabled"
          filterKey={'disability'}
          chart={{
            colors: [
              theme.palette.primary.main,
              theme.palette.warning.main,
              theme.palette.info.main,
              theme.palette.primary.main,
            ],
            options: {
              chart: {
                stacked: true,
              },
            },
            ...demographicReportData?.disability,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default DemographicCharts;
