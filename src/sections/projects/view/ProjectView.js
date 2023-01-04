import React, { useEffect, useCallback,useState } from 'react';
import {Card, Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import MoreInfoCard from './MoreInfoCard';
import ViewTabs from './ViewTabs';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { useRahat } from '@services/contracts/useRahat';
import { useTheme } from '@mui/system';
import { SPACING } from '@config';
import { useRahatCash } from '@services/contracts/useRahatCash';
import ProjectChart from './ProjectCharts';
import Barchart from './Barchart';

const ProjectView = () => {
  const {  refresh, refreshData ,beneficiariesVillageChartData,getBeneficiariesByvillage} = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();
  const [selectedVillage, setSelectedVillage] = useState();

  const handleVillage = (village) => {
    if (!village || village === 'undefined') return;
    setSelectedVillage(village);
  };

  const {
    query: { projectId },
  } = useRouter();
  const theme = useTheme();

  const init = useCallback(async () => {
    if (!RahatCash) return;
    await projectBalance(projectId);
  }, [projectId, contract, RahatCash, refresh]);



  useEffect(() => {
    if (!projectId || !contract) return;
    init(projectId);
  }, [projectId, RahatCash, refresh]);


  useEffect(() => {
    RahatCash?.on('Approval', refreshData);
    RahatCash?.on('Transfer', refreshData);
    return () => RahatCash?.removeAllListeners();
  }, [RahatCash]);
  
  useEffect(()=>{
    if (!projectId) return;
    getBeneficiariesByvillage(projectId);
  },[projectId]);

  return (
    <>
      {/* <Grid container spacing={theme.spacing(SPACING.GRID_SPACING)}> */}
      <Grid item xs={12} md={8}>
        <Grid container direction="row" justifyContent="center" alignItems="flex-start">
          <Grid  item spacing={SPACING.GRID_SPACING} xs={12} md={4} >
        <Card sx={{ width: '100%', mb: 0 , height:'455px'}} >
          <BasicInfoCard rahatChainData={rahatChainData} />
          <MoreInfoCard />
          </Card>
          </Grid>
          <Grid  item spacing={SPACING.GRID_SPACING} xs={12} md={8}>
          <Card sx={{ width: '100%', mb: 0 }}>
        
          {beneficiariesVillageChartData ? (
            <Grid item xs={12} md={12}>
            <Barchart
              title="Beneficaries per village"
              chart={beneficiariesVillageChartData}
              setSelectedVillage={setSelectedVillage}
              handleVillage={handleVillage}
            />
          </Grid>
        ) : (
          <></>
        )}
         </Card>
      </Grid>

         
        </Grid>
        <ProjectChart projectId={projectId} selectedVillage={selectedVillage}/>

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
