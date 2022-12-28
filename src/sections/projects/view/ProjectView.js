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
import Barchart from './Barchart';

const ProjectView = () => {
  const { roles } = useAuthContext();
  const { getProjectById, refresh, refreshData, getChartData, chartData, getBeneficiariesByvillage, beneficiariesVillageChartData } = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();
  const [accessToPhoneChartData, setAccessToPhoneChartData] = useState();
  const [genderWiseDistribution, setGenderWiseDistribution] = useState();
  const [phoneOwnerShip, setPhoneOwnerShip] = useState();
  const [simcardOwenerShip, setSimcardOwenerShip] = useState();
  const [accessToInternet, setAccessToInternet] = useState();
  const [bankAccountType, setBankAccountType] = useState();
  const [banked, setBanked] = useState()

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
      projectId: projectId
    }
    getChartData(CHARTDATATYPES, query)
    getBeneficiariesByvillage(projectId)
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
    if (!chartData) return;
    // need to move and  call from utils
    const colors = [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.warning.main,
    ];
    chartData.forEach((elem) => {
      let series = [];
      if (elem.chart === "hasInternetAccess") {
        elem.data.forEach((obj) => {
          if (obj.hasInternetAccess) {
            series.push({ label: "Has Access", value: obj.count })
          }
          if (!obj.hasInternetAccess) {
            series.push({ label: "Not Access", value: obj.count })
          }
        });
        const data = {
          title: " Access To Internet",
          colors: colors,
          series: series
        }
        setAccessToInternet(data);

      }
      if (elem.chart === "hasPhone") {
        elem.data.forEach((obj) => {
          if (obj.hasPhone) {
            series.push({ label: "Has Access", value: obj.count })
          }
          if (!obj.hasPhone) {
            series.push({ label: "Not Access", value: obj.count })
          }

        });
        const data = {
          title: " Access to Phone",
          colors: colors,
          series: series
        }
        setAccessToPhoneChartData(data);
      }

      if (elem.chart === "gender") {
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
          title: "Gender-wise Distribution",
          colors: colors,
          series: series
        };
        setGenderWiseDistribution(data);

      }
      if (elem.chart === "bankAccountType") {
        elem.data.forEach((obj) => {
          if (!obj.bankAccountType) obj.bankAccountType = "undefined"
          series.push({ label: obj.bankAccountType, value: obj.count })
        })
        const data = {
          title: "Bank Account Type",
          colors: colors,
          series: series
        }
        setBankAccountType(data)
      }

      if (elem.chart === "isBanked") {
        elem.data.forEach((obj) => {
          if (obj.isBanked) series.push({ label: "Banked", value: obj.count });
          if (!obj.isBanked) series.push({ label: "UnBanked", value: obj.count });
        })
        const data = {
          title: "Banked or Unbanked",
          colors: colors,
          series: series
        }
        setBanked(data)
      }

      if (elem.chart === "phoneOwnedBy") {
        elem.data.forEach((obj) => {
          series.push({ label: obj.phoneOwnedBy, value: obj.count });

        })
        const data = {
          title: "Phone Ownership",
          colors: colors,
          series: series
        }
        setPhoneOwnerShip(data)
      }
      if (elem.chart === "simRegisteredUnder") {
        console.log(elem.data)
        elem.data.forEach((obj) => {
          
          series.push({ label: obj.simRegisteredUnder, value: obj.count });

        })
        const data = {
          title: "Sim Card Ownership",
          colors: colors,
          series: series
        }
        setSimcardOwenerShip(data)
      }
    })

  }, [chartData]);

  useEffect(() => {
    formatData()
  }, [formatData]);


  return (
    <>
      {/* <Grid container spacing={theme.spacing(SPACING.GRID_SPACING)}> */}
      <Grid item xs={12} md={8} >
        <Grid container direction="column" justifyContent="center" alignItems="flex-start" style={{ height: "494px" }}>
          <BasicInfoCard rahatChainData={rahatChainData} />
          <MoreInfoCard />
        </Grid>
        <Grid container  >
          {beneficiariesVillageChartData ?
            <Grid xs={12} md={8} >
              <Barchart title="Beneficaries per village" chart={beneficiariesVillageChartData} />
            </Grid> : <></>}
          {genderWiseDistribution ?
            <Grid xs={12} md={4} >
              <Piechart title={genderWiseDistribution.title} chart={genderWiseDistribution} />
            </Grid> : <></>
          }
        </Grid>

        <Grid container>
          {accessToInternet ? <Grid xs={12} md={4}>
            <Piechart title={accessToInternet.title} chart={accessToInternet} />
          </Grid> : <></>}
          {phoneOwnerShip ?
            <Grid xs={12} md={4} >
              <Piechart title={phoneOwnerShip.title} chart={phoneOwnerShip} />
            </Grid> : <></>}
          {accessToPhoneChartData ?
            <Grid xs={12} md={4} >
              <Piechart title={accessToPhoneChartData.title} chart={accessToPhoneChartData} />
            </Grid> : <></>}
          {simcardOwenerShip ?
            <Grid xs={12} md={4} >
              <Piechart title={simcardOwenerShip.title} chart={simcardOwenerShip} />
            </Grid> : <></>}
          {bankAccountType ?
            <Grid xs={12} md={4} >
              <Piechart title={bankAccountType.title} chart={bankAccountType} />
            </Grid> : <></>}
          {banked ?
            <Grid xs={12} md={4} >
              <Piechart title={banked.title} chart={banked} />
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
