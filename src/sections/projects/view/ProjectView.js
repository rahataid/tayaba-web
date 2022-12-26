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
import { SPACING } from '@config';
import { useRahatCash } from '@services/contracts/useRahatCash';
import Piechart from './Piechart';

const ProjectView = () => {
  const { roles } = useAuthContext();
  const { getProjectById, refresh, refreshData } = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();

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
    if (!projectId || !contract) return;
    init(projectId);
  }, [projectId, RahatCash, refresh]);

  useEffect(() => {
    RahatCash?.on('Approval', refreshData);
    RahatCash?.on('Transfer', refreshData);
    return () => RahatCash?.removeAllListeners();
  }, [RahatCash]);
  
  const accessToPhoneChartData ={
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.warning.main,
    ],
    series:  [
      {label:"Access To Phone", value:2},
      {label:" Not Access To Phone", value:2}
    ]
  };
  

  return (
    <>
      <Grid container spacing={theme.spacing(SPACING.GRID_SPACING)}>
        <Grid item xs={12} md={8}>
          <Grid container direction="column" justifyContent="center" alignItems="flex-start" style={{height:"494px"}}>
            <BasicInfoCard rahatChainData={rahatChainData} />
            <MoreInfoCard />
          </Grid>
          <Grid container>
          {/* <Piechart title=" Access To Phone" chart={accessToPhoneChartData}  ></Piechart>

          <Piechart title=" Access To Phone" chart={accessToPhoneChartData}  ></Piechart>
          <Piechart title=" Access To Phone" chart={accessToPhoneChartData}  ></Piechart> */}

            <Grid  xs={12} md={6} >
            <Piechart title=" Access To Phone" chart={accessToPhoneChartData}  ></Piechart>
            </Grid>
            <Grid  xs={12} md={6} >
            <Piechart title=" Access To Phone" chart={accessToPhoneChartData}  ></Piechart>
            </Grid>
            <Grid  xs={12} md={6}>
            <Piechart title=" Access To Phone" chart={accessToPhoneChartData}  ></Piechart>
            </Grid>
        </Grid>
          <Stack sx={{ mt: theme.spacing(SPACING.GRID_SPACING) }}>
            <ViewTabs />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
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
          <ChartCard rahatChainData={rahatChainData} />
          <Grid>
            <Piechart title=" Access To Phone" chart={accessToPhoneChartData}  ></Piechart>
            </Grid>
          {/* <Grid item xs={12} md={4}> */}
          {/* </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

ProjectView.propTypes = {};

export default ProjectView;
