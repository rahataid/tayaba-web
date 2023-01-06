import React, { useEffect, useCallback, useState } from 'react';
import {Card, Grid, Stack,Button } from '@mui/material';
import InfoCard from './InfoCard';
import MoreInfoCard from './MoreInfoCard';
import ViewTabs from './ViewTabs';
import { PalikaCash, DonorCash, AgencyCash } from '../cash-tracker';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { useRahat } from '@services/contracts/useRahat';
import { useTheme } from '@mui/system';
import { SPACING } from '@config';
import { useRahatCash } from '@services/contracts/useRahatCash';
import ProjectChart from './ProjectCharts';
import { getFlickrImages } from '@services/flickr';
import { useAuthContext } from 'src/auth/useAuthContext';
import { role } from 'src/_mock/assets';
import BasicInfoCard from './BasicInfoCard';
import { AppWelcome ,AppFeatured} from './minimalpages';
const ProjectView = () => {
  const {  refresh, refreshData,getProjectById } = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();
const [flickImages,setFlickImages] = useState([])
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

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId);
  }, [projectId]);


  return (
    <>
      {/* <Grid container spacing={theme.spacing(SPACING.GRID_SPACING)}> */}
      <Grid item xs={12} md={8}>
      <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome/>
          </Grid>
          <Grid item xs={12} md={4}>
            <AppFeatured list= {flickImages} />
          </Grid>
          </Grid>


        <Grid  container spacing={3}>
        <Grid item xs={12} md={8}>
          <InfoCard rahatChainData={rahatChainData} />
          </Grid>
          <Grid item xs={12} md={4}>
          {/* role.tayaba */}
          
          {true && (
            <PalikaCash
              projectId={projectId}
              rahatChainData={rahatChainData}
              refresh={refresh}
              refreshData={refreshData}
            />
          )}
          {/* {role.srso} */}
          {/* {true && <AgencyCash rahatChainData={rahatChainData} />} */}
          {/* {role.srsorep} */}
          {/* {true && <DonorCash rahatChainData={rahatChainData} />} */}
          </Grid>
        </Grid>
        
        <ProjectChart projectId={projectId} />
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
