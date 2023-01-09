import React, { useEffect, useCallback, useState } from 'react';
import { Card, Grid, Stack, Alert, Typography } from '@mui/material';
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
import { AppWelcome, AppFeatured } from './minimalpages';
import TitleCard from './TitleCard';
import  SummaryTracker  from '@sections/cash-tracker/tracker/SummaryTracker';
const ProjectView = () => {
  const { refresh, refreshData, getProjectById, singleProject } = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();
  const [flickImages, setFlickImages] = useState([])
  const [alert,setAlert] = useState({
    type:'',
    message:""
  })
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
    setAlert({
      type:"success",
      message:"Sucessfully Transfered Token"
    })
    getProjectById(projectId);
  }, [projectId]);


  return (
    <Grid item xs={12} md={8}>
      <Grid container spacing={SPACING.GRID_SPACING}>
        <Grid item xs={12} md={8}>
          <AppFeatured list={flickImages} />
          <Stack mt={5} mb={2}>
          <SummaryTracker/>
          </Stack>
          <InfoCard rahatChainData={rahatChainData} />
        </Grid>
        <Grid item xs={12} md={4} >
          <Grid container spacing={3} >
            <Grid item xs={12} md={12}>
             <TitleCard rahatChainData={rahatChainData} />
              
            </Grid>
            {alert &&
            <Grid item xs={12} md={12} >
              <Alert severity={alert.type}> {alert?.message} </Alert>
            </Grid>
            }

            <Grid item xs={12} md={12}>
              <AppWelcome />
            </Grid>
          </Grid>

          {/* {role.srso} */}
          {/* {role.srso && <AgencyCash rahatChainData={rahatChainData} />} */}
          {/* {role.srsorep} */}
          {/* {role.srsorep && <DonorCash rahatChainData={rahatChainData} />} */}

        </Grid>
      </Grid>
    
      <Grid container spacing={SPACING.GRID_SPACING}>
        <Grid item xs={12} md={12}>
          <ProjectChart projectId={projectId} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Stack sx={{ mt: theme.spacing(SPACING.GRID_SPACING) }}>
            <ViewTabs />
          </Stack>
        </Grid>
      </Grid>
    </Grid>


  );
};

ProjectView.propTypes = {};

export default ProjectView;
