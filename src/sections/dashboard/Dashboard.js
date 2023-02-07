import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
// @mui
import { useTheme } from '@mui/material/styles';
import BarchartSingle from './BarchartSingle';
import Piechart from '@components/chart/Piechart';
import { useRouter } from 'next/router';
import { getFlickrImages } from '@services/flickr';
import PhotoGallery from './PhotoGallery';
import { SPACING, CHARTDATATYPES } from '@config';
import { MapView } from './maps';
import { useDashboardContext } from '@contexts/dashboard';

const DashboardComponent = () => {
  const theme = useTheme();
  const router = useRouter();

  const { summary, demographicSummary, beneficiariesVillageChartData, getChartData, chartData, getDemographicSummary } =
    useDashboardContext();

  const [flickImages, setFlickImages] = useState([]);
  const [accessToPhoneChartData, setAccessToPhoneChartData] = useState();
  const [genderWiseDistribution, setGenderWiseDistribution] = useState();
  const [accessToInternet, setAccessToInternet] = useState();
  const [banked, setBanked] = useState();
  const [selectedVillage, setSelectedVillage] = useState();

  const formatData = useCallback(() => {
    if (!chartData) return;
    // need to move and  call from utils
    const colors = [
      theme.palette.info.light,
      theme.palette.primary.light,
      theme.palette.warning.light,
      theme.palette.error.light,
    ];

    chartData.forEach((elem) => {
      let series = [];
      if (elem.chart === 'hasInternetAccess') {
        elem.data.forEach((obj) => {
          if (obj.hasInternetAccess) {
            series.push({ label: 'Has Access', value: obj.count });
          }
          if (!obj.hasInternetAccess) {
            series.push({ label: 'Not Access', value: obj.count });
          }
        });
        const data = {
          title: selectedVillage ? `Access To Internet (${selectedVillage})` : 'Access To Internet',
          colors: colors,
          series: series,
        };
        setAccessToInternet(data);
      }
      if (elem.chart === 'hasPhone') {
        elem.data.forEach((obj) => {
          if (obj.hasPhone) {
            series.push({ label: 'Has Access', value: obj.count });
          }
          if (!obj.hasPhone) {
            series.push({ label: 'Not Access', value: obj.count });
          }
        });
        const data = {
          title: selectedVillage ? ` Access to Phone (${selectedVillage})` : ` Access to Phone`,
          colors: colors,
          series: series,
        };
        setAccessToPhoneChartData(data);
      }

      if (elem.chart === 'gender') {
        elem.data.forEach((obj) => {
          if (obj.gender === 'M') {
            series.push({ label: 'Male', value: obj.count });
          }
          if (obj.gender === 'F') {
            series.push({ label: 'Female', value: obj.count });
          }
          if (obj.gender === 'O') {
            series.push({ label: 'Others', value: obj.count });
          }
        });
        const data = {
          title: selectedVillage ? `Gender-wise Distribution (${selectedVillage})` : `Gender-wise Distribution`,
          colors: colors,
          series: series,
        };
        setGenderWiseDistribution(data);
      }

      if (elem.chart === 'isBanked') {
        elem.data.forEach((obj) => {
          if (obj.isBanked) series.push({ label: 'Banked', value: obj.count });
          if (!obj.isBanked) series.push({ label: 'UnBanked', value: obj.count });
        });
        const data = {
          title: selectedVillage ? `Banked or Unbanked (${selectedVillage})` : 'Banked or Unbanked',
          colors: colors,
          series: series,
        };
        setBanked(data);
      }
    });
  }, [chartData]);

  useEffect(() => {
    formatData();
  }, [formatData]);

  useEffect(() => {
    getDemographicSummary();
  }, [getDemographicSummary]);

  useEffect(() => {
    let query = {
      village: selectedVillage,
    };
    getChartData(CHARTDATATYPES, query);
  }, []);

  useEffect(() => {
    const getFlickPics = async () => {
      const params = {
        per_page: 10,
      };
      const res = await getFlickrImages(params);
      setFlickImages(res.photo);
    };
    getFlickPics();

    return () => {
      setFlickImages([]);
    };
  }, []);

  return (
    <Box>
      <Grid container spacing={theme.spacing(SPACING.GRID_SPACING)}>
        <Grid
          container
          lg={7}
          spacing={theme.spacing(SPACING.GRID_SPACING)}
          sx={{
            px: theme.spacing(SPACING.GRID_SPACING),
          }}
        >
          <Grid item xs={12} md={6}>
            <SummaryCard
              color="warning"
              icon="material-symbols:person-4"
              title="Beneficiaries"
              total={demographicSummary?.totalBeneficiaries}
              subtitle={'households'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SummaryCard
              color="info"
              icon="ic:outline-water-drop"
              title="H2O Disbursed"
              total={demographicSummary?.totalH20Disbursed}
              subtitle={'wheels'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SummaryCard
              color="success"
              icon="pajamas:project"
              title="Projects"
              total={demographicSummary?.totalProjects}
              subtitle={'involved'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SummaryCard
              color="secondary"
              icon="maki:village"
              title="Villages"
              total={demographicSummary?.totalVillages}
              subtitle={'impacted'}
            />
          </Grid>
        </Grid>
        <Grid container xs={12} md={6} lg={5}>
          <Grid item xs={12} md={12}>
            <PhotoGallery list={flickImages} />
          </Grid>
        </Grid>

        {genderWiseDistribution ? (
          <Grid item xs={12} md={3}>
            <Piechart title={genderWiseDistribution.title} chart={genderWiseDistribution} />
          </Grid>
        ) : (
          <></>
        )}
        {accessToInternet ? (
          <Grid item xs={12} md={3}>
            <Piechart title={accessToInternet.title} chart={accessToInternet} />
          </Grid>
        ) : (
          <></>
        )}

        {accessToPhoneChartData ? (
          <Grid item xs={12} md={3}>
            <Piechart title={accessToPhoneChartData.title} chart={accessToPhoneChartData} />
          </Grid>
        ) : (
          <></>
        )}

        {banked ? (
          <Grid item xs={12} md={3}>
            <Piechart title={banked.title} chart={banked} />
          </Grid>
        ) : (
          <></>
        )}

        <Grid item xs={12} md={6}>
          <BarchartSingle
            title="Beneficiaries by Village"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              options: {
                chart: {
                  stacked: true,
                },
              },
              ...beneficiariesVillageChartData,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <MapView />
        </Grid>
      </Grid>
    </Box>
  );
};

DashboardComponent.propTypes = {};

export default DashboardComponent;
