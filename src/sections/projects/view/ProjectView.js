import React, { useEffect, useCallback, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import { PalikaCash, DonorCash, AgencyCash } from '../cash-tracker';
import MoreInfoCard from './MoreInfoCard';
import ChartCard from './ChartCard';
import ViewTabs from './ViewTabs';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { useRahat } from '@services/contracts/useRahat';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useTheme } from '@mui/system';
import { SPACING, CHARTDATATYPES } from '@config';
import { useRahatCash } from '@services/contracts/useRahatCash';
import Piechart from './Piechart';

const ProjectView = () => {
  const { roles } = useAuthContext();
  const { getProjectById, refresh, refreshData, getChartData, chartData } = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();
  const [accessToPhoneChartData, setAccessToPhoneChartData] = useState();
  const [genderWiseDistribution, setGenderWiseDistribution] = useState();
  const [phoneOwnerShip, setPhoneOwnerShip] = useState();
  const [simcardOwenerShip, setSimcardOwenerShip] = useState();
  const [accessToInternet, setAccessToInternet] = useState();
  const [bankAccountType, setBankAccountType] = useState();


  const {
    query: { projectId },
  } = useRouter();
  const theme = useTheme();

  const init = useCallback(async () => {
    if (!RahatCash) return;
    await projectBalance(projectId);
  }, [projectId, contract, RahatCash, refresh]);

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId);
  }, [projectId]);


  useEffect(() => {
    if (!projectId) return;
    let query = {
      projectId: 1
    }
    getChartData(CHARTDATATYPES, query)
  }, [projectId]);

  useEffect(() => {
    if (!projectId || !contract) return;
    init(projectId);
  }, [projectId, RahatCash, refresh]);

  useEffect(() => {
    RahatCash?.on('Approval', refreshData);
    RahatCash?.on('Transfer', refreshData);
    return () => RahatCash?.removeAllListeners();
  }, [RahatCash]);

  const formatData = useCallback(() => {
    if (!chartData.length) return;
    // need to move and  call from utils
    chartData.forEach((elem) => {
      if (elem.chart === "hasInternetAccess") {
        let series = []
        elem.data.forEach((obj) => {
          if (obj.hasInternetAccess) {
            series.push({ label: "Has Access", value: obj.count })
          }
          if (!obj.hasInternetAccess) {
            series.push({ label: "Not Access", value: obj.count })
          }

        })
        const data = {
          title: "Internet",
          colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.warning.main,
          ],
          series: series
        }
        setAccessToInternet(data);

      }
      if (elem.chart === "hasPhone") {
        let series = []
        elem.data.forEach((obj) => {
          if (obj.hasPhone) {
            series.push({ label: "Has Access", value: obj.count })
          }
          if (!obj.hasPhone) {
            series.push({ label: "Not Access", value: obj.count })
          }

        })
        const data = {
          title: "Phone",
          colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.warning.main,
          ],
          series: series
        }
        setAccessToPhoneChartData(data);
      }

      if (elem.chart === "gender") {
        let series = []
        elem.data.forEach((obj) => {
          if (obj.gender === 'M') {
            series.push({ label: "Male", value: obj.count })
          }
          if (obj.gender === 'F') {
            series.push({ label: "Female", value: obj.count })
          }
          if (obj.gender === 'O') {
            series.push({ label: "Others", value: obj.count })
          }
        })
        const data = {
          title: "Gender",
          colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.warning.main,
          ],
          series: series
        };
        setGenderWiseDistribution(data);

      }
      if (elem.chart === "bankAccountType") {
        let series = []
        elem.data.forEach((obj) => {
          series.push({ label: obj.bankAccountType, value: obj.count })
        })
        const data = {
          title: "Phone",
          colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.warning.main,
          ],
          series: series
        }
        setBankAccountType(data)
      }
    })

  }, [chartData]);

  useEffect(() => {
    formatData()
  }, [formatData])



  return (
    <>
      {/* <Grid container spacing={theme.spacing(SPACING.GRID_SPACING)}> */}
      <Grid item xs={12} md={8}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start" style={{ height: "494px" }}>
          <BasicInfoCard rahatChainData={rahatChainData} />
          <MoreInfoCard />
        </Grid>
        <Grid container  >
          {accessToPhoneChartData ?
            <Grid xs={12} md={6} >
              <Piechart title={accessToPhoneChartData.title} chart={accessToPhoneChartData} />
            </Grid> : <></>}
          {genderWiseDistribution ?
            <Grid xs={12} md={6} >
              <Piechart title={genderWiseDistribution.title} chart={genderWiseDistribution} />
            </Grid> : <></>
          }

          {accessToInternet ? <Grid xs={12} md={6}>
            <Piechart title={accessToInternet.title} chart={accessToInternet} />
          </Grid> : <></>}
        </Grid>
        <Stack sx={{ mt: theme.spacing(SPACING.GRID_SPACING) }}>
          <ViewTabs />
        </Stack>
      </Grid>
      {/* <Grid item xs={12} md={4}>
          {roles.isPalika && (
            <PalikaCash
              projectId={projectId}
              rahatChainData={rahatChainData}
              refresh={refresh}
              refreshData={refreshData}
            />
          )}
          {roles.isAgency && <AgencyCash rahatChainData={rahatChainData} />}
          {roles.isDonor && <DonorCash rahatChainData={rahatChainData} />}
          <Grid>
            <ChartCard rahatChainData={rahatChainData} />
          </Grid>
          {bankAccountType ?
            <Grid>
              <Piechart title={bankAccountType.title} chart={bankAccountType}  ></Piechart>
            </Grid> : <></>}

        </Grid> */}
      {/* </Grid> */}
    </>
  );
};

ProjectView.propTypes = {};

export default ProjectView;
