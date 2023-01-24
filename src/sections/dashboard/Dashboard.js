import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardHeader, Grid, Stack } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
// @mui
import { useTheme } from '@mui/material/styles';
import BarchartSingle from './BarchartSingle';
import Piechart from '@components/chart/Piechart';
import { useRouter } from 'next/router';
import { PATH_REPORTS } from '@routes/paths';
import Iconify from '@components/iconify';
import { getFlickrImages } from '@services/flickr';
import PhotoGallery from './PhotoGallery';
import { SPACING } from '@config';
import { MapView } from './maps';
import { useDashboardContext } from '@contexts/dashboard';
import SummaryTracker from '@sections/cash-tracker/tracker/SummaryTracker';

const DashboardComponent = () => {
  const theme = useTheme();
  const router = useRouter();

  const {
    summary,
    demographicSummary,
    getSummary,
    getGeoMapData,
    getGenderDistribution,
    beneficiariesVillageChartData,
    bankedUnbanked,
    phoneOwnership,
    genderWardChart,
    getBankedUnbanked,
    getPhoneOwnership,
    getCashTrackerSummary,
    cashTrackerSummary,
    getDemographicSummary,
  } = useDashboardContext();

  const [flickImages, setFlickImages] = useState([]);

  

  useEffect(() => {
    getDemographicSummary();
  }, [getDemographicSummary]);

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
            color='info'
            icon="ic:outline-water-drop" 
            title="H20 Disbursed" 
            total={demographicSummary?.totalH20Disbursed} 
            subtitle={'wheels'} />
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



        <Grid item xs={12} md={3}>
          <Piechart
            title="Gender Distribution"
            chart={{
              colors: [
                theme.palette.primary.light,
                theme.palette.success.light,
                theme.palette.warning.light,
                theme.palette.error.light,
              ],
              series: [{
                label:"M",
                value:10

              },
              {
                label:"F",
                value:12

              }],
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Piechart
            title="Phone Ownership Distribution"
            chart={{
              colors: [
                theme.palette.primary.light,
                theme.palette.success.light,
                theme.palette.error.light,
                theme.palette.warning.light,
              ],
              series: [{
                label:"has phone",
                value:13

              },
              {
                label:"has not phone",
                value:6

              }],
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Piechart
            title="Access To Internet"
            chart={{
              colors: [
                theme.palette.primary.light,
                theme.palette.success.light,
                theme.palette.error.light,
                theme.palette.warning.light,
              ],
              series: [{
                label:"has Access",
                value:6

              },
              {
                label:"has not access",
                value:3

              }],
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Piechart
            title="Banked vs Unbanked"
            chart={{
              colors: [
                theme.palette.error.light,
                theme.palette.success.light,
                theme.palette.warning.light,
                theme.palette.primary.light,
              ],
              series: [{
                label:"Banked",
                value:11

              },
              {
                label:"Unbanked",
                value:6

              }],
            }}
          />
        </Grid>
      
        <Grid item xs={12} md={6}>
          <BarchartSingle
            title="Beneficiaries by Village"
            chart={{colors: [
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
            ...beneficiariesVillageChartData,}}
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
