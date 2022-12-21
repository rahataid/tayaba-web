import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, Stack } from '@mui/material';
import SummaryCard from '@components/SummaryCard';
import { useModuleContext } from './context';
// @mui
import { useTheme } from '@mui/material/styles';
import BarchartSingle from './BarchartSingle';
import Piechart from './Piechart';
import { LiveTransactionTable } from '@sections/transactionTable';
import { useRouter } from 'next/router';
import { PATH_REPORTS } from '@routes/paths';
import Iconify from '@components/iconify';
import { getFlickrImages } from '@services/flickr';
import PhotoGallery from './PhotoGallery';
import { SPACING } from '@config';
import { MapView } from './maps';
import { useDashboardContext } from '@contexts/dashboard';

const DashboardComponent = () => {
  const theme = useTheme();
  const router = useRouter();

  const { summary, getSummary, getGeoMapData } = useDashboardContext();
  const {
    getBeneficiaryCountByGender,
    countByGender,
    countByMethod,
    countByMode,
    getTransactionsCountByWard,
    dashboardWardChartData,
    getTransactionsCountByMethod,
    getTransactionsCountByMode,
    beneficiaryCounts,
    getBeneficiariesCounts,
  } = useModuleContext();

  const [flickImages, setFlickImages] = useState([]);

  useEffect(() => {
    getSummary();
  }, [getSummary]);

  useEffect(() => {
    getGeoMapData();
  }, [getGeoMapData]);

  useEffect(() => {
    getBeneficiaryCountByGender();
  }, [getBeneficiaryCountByGender]);

  useEffect(() => {
    getTransactionsCountByWard();
  }, [getTransactionsCountByWard]);

  useEffect(() => {
    getTransactionsCountByMethod();
  }, [getTransactionsCountByMethod]);

  useEffect(() => {
    getTransactionsCountByMode();
  }, [getTransactionsCountByMode]);

  useEffect(() => {
    getBeneficiariesCounts();
  }, [getBeneficiariesCounts]);

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
          lg={6}
          spacing={theme.spacing(SPACING.GRID_SPACING)}
          sx={{
            px: theme.spacing(SPACING.GRID_SPACING),
          }}
        >
          <Grid item xs={12} md={4}>
            <SummaryCard
              icon="material-symbols:person-4"
              title="Beneficiaries"
              total={beneficiaryCounts?.impacted?.totalClaimed}
              subtitle={'households'}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <SummaryCard
              icon={'fa6-solid:children'}
              title="Under 5"
              total={summary?.total_children}
              // total={beneficiaryCounts?.impacted}
              subtitle={'children'}
            />
          </Grid>

          {/* <Grid item xs={12} md={4}>
          <ActivateResponse />
        </Grid> */}

          <Grid item xs={12} md={4}>
            <SummaryCard
              icon={'fa6-solid:users'}
              title="Total Impact"
              total={summary?.total_persons}
              // total={beneficiaryCounts?.impacted?.totalFamilyCount}
              subtitle={'people'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              title="Unbanked"
              icon="mdi:bank-transfer-out"
              total={summary?.total_unbanked}
              // total={beneficiaryCounts?.impacted?.totalFamilyCount}
              subtitle={'persons'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              icon="material-symbols:token"
              title="Token Issued"
              total={beneficiaryCounts?.impacted?.totalFamilyCount}
              subtitle={'tokens'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              icon="ph:currency-circle-dollar-light"
              title="Token Redeemed"
              total={beneficiaryCounts?.impacted?.totalFamilyCount}
              subtitle={'tokens'}
            />
          </Grid>
        </Grid>
        <Grid container xs={12} md={6} lg={6}>
          <Grid item xs={12} md={12}>
            <PhotoGallery
              list={flickImages}
              sx={{
                height: '100%',
                overflow: 'hidden',
              }}
            />
          </Grid>
        </Grid>

        {/* <Grid item xs={12} md={4}>
          <WardGenderInfoCard selectedWard={selectedWard} />
        </Grid> */}

        <Grid item xs={12} lg={12}>
          <LiveTransactionTable />
        </Grid>

        <Grid item xs={12} md={3}>
          <Piechart
            title="Gender Distribution"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: countByGender,
            }}
            footer={
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ p: 2 }}>
                <Button
                  onClick={() => router.push(PATH_REPORTS.wardReport)}
                  endIcon={<Iconify icon={'material-symbols:chevron-right-rounded'} />}
                >
                  View Ward Wise Report
                </Button>
              </Stack>
            }
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <BarchartSingle
            title="Claim with SMS vs QR Card"
            sx={{
              minHeight: 495,
            }}
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              ...countByMethod,
            }}
          />
          {/* <Piechart
            title="Claim with SMS vs QR Card"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: countByMethod,
            }}
          /> */}
        </Grid>

        <Grid item xs={12} md={3}>
          <Piechart
            title="Claimed Vs Budget"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: [
                { label: 'Available', value: 12234 },
                { label: 'Issued', value: 12244 },
              ],
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Offline Vs Online"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ],
              series: countByMode,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarchartSingle
            title="Ward Wise Claim"
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
                  selection: {
                    enabled: true,
                  },
                },
              },
              ...dashboardWardChartData,
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
