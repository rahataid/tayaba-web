import React, { useEffect, useCallback, useState } from 'react';
import { useProjectContext } from '@contexts/projects';
import { Grid, Stack } from '@mui/material';
import { SPACING, CHARTDATATYPES } from '@config';
import Piechart from './Piechart';
import Barchart from './Barchart';
import { useTheme } from '@mui/system';

const ProjectChart = ({projectId})=>{
  const {
    getChartData,
    chartData,
    getBeneficiariesByvillage,
    beneficiariesVillageChartData,
  } = useProjectContext();
  const theme = useTheme();
  console.log({projectId})

    const [accessToPhoneChartData, setAccessToPhoneChartData] = useState();
    const [genderWiseDistribution, setGenderWiseDistribution] = useState();
    const [phoneOwnerShip, setPhoneOwnerShip] = useState();
    const [simcardOwenerShip, setSimcardOwenerShip] = useState();
    const [accessToInternet, setAccessToInternet] = useState();
    const [bankAccountType, setBankAccountType] = useState();
    const [banked, setBanked] = useState();
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
              title: ' Access To Internet',
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
              title: ' Access to Phone',
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
              title: 'Gender-wise Distribution',
              colors: colors,
              series: series,
            };
            setGenderWiseDistribution(data);
          }
          if (elem.chart === 'bankAccountType') {
            elem.data.forEach((obj) => {
              if (!obj.bankAccountType) obj.bankAccountType = 'undefined';
              series.push({ label: obj.bankAccountType, value: obj.count });
            });
            const data = {
              title: 'Bank Account Type',
              colors: colors,
              series: series,
            };
            setBankAccountType(data);
          }
    
          if (elem.chart === 'isBanked') {
            elem.data.forEach((obj) => {
              if (obj.isBanked) series.push({ label: 'Banked', value: obj.count });
              if (!obj.isBanked) series.push({ label: 'UnBanked', value: obj.count });
            });
            const data = {
              title: 'Banked or Unbanked',
              colors: colors,
              series: series,
            };
            setBanked(data);
          }
    
          if (elem.chart === 'phoneOwnedBy') {
            elem.data.forEach((obj) => {
              series.push({ label: obj.phoneOwnedBy, value: obj.count });
            });
            const data = {
              title: 'Phone Ownership',
              colors: colors,
              series: series,
            };
            setPhoneOwnerShip(data);
          }
          if (elem.chart === 'simRegisteredUnder') {
            console.log(elem.data);
            elem.data.forEach((obj) => {
              series.push({ label: obj.simRegisteredUnder, value: obj.count });
            });
            const data = {
              title: 'Sim Card Ownership',
              colors: colors,
              series: series,
            };
            setSimcardOwenerShip(data);
          }
        });
      }, [chartData]);
    
      useEffect(() => {
        formatData();
      }, [formatData]);

      useEffect(() => {
        if (!projectId) return;
        let query = {
          projectId: projectId,
        };
        getChartData(CHARTDATATYPES, query);
        getBeneficiariesByvillage(projectId);
      }, [projectId]);

    return (
        <div>
              <Grid container spacing={SPACING.GRID_SPACING}>
          {beneficiariesVillageChartData ? (
            <Grid item xs={12} md={8}>
              <Barchart title="Beneficaries per village" chart={beneficiariesVillageChartData} />
            </Grid>
          ) : (
            <></>
          )}
          {genderWiseDistribution ? (
            <Grid item xs={12} md={4}>
              <Piechart title={genderWiseDistribution.title} chart={genderWiseDistribution} />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>

        <Grid container spacing={SPACING.GRID_SPACING}>
          {accessToInternet ? (
            <Grid item xs={12} md={4}>
              <Piechart title={accessToInternet.title} chart={accessToInternet} />
            </Grid>
          ) : (
            <></>
          )}
          {phoneOwnerShip ? (
            <Grid item xs={12} md={4}>
              <Piechart title={phoneOwnerShip.title} chart={phoneOwnerShip} />
            </Grid>
          ) : (
            <></>
          )}
          {accessToPhoneChartData ? (
            <Grid item xs={12} md={4}>
              <Piechart title={accessToPhoneChartData.title} chart={accessToPhoneChartData} />
            </Grid>
          ) : (
            <></>
          )}
          {simcardOwenerShip ? (
            <Grid item xs={12} md={4}>
              <Piechart title={simcardOwenerShip.title} chart={simcardOwenerShip} />
            </Grid>
          ) : (
            <></>
          )}
          {bankAccountType ? (
            <Grid item xs={12} md={4}>
              <Piechart title={bankAccountType.title} chart={bankAccountType} />
            </Grid>
          ) : (
            <></>
          )}
          {banked ? (
            <Grid item xs={12} md={4}>
              <Piechart title={banked.title} chart={banked} />
            </Grid>
          ) : (
            <></>
          )}
        </Grid>

        </div>
    )

};
export default ProjectChart