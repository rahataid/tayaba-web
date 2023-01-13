import React, { useEffect, useCallback, useState } from 'react';
import { Grid, Stack, Alert } from '@mui/material';
import InfoCard from './InfoCard';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { useRahat } from '@services/contracts/useRahat';
import { SPACING } from '@config';
import { useRahatCash } from '@services/contracts/useRahatCash';
import ProjectChart from './ProjectCharts';
import { getFlickrImages } from '@services/flickr';
import ImageSlider from './ImageSlider';
import ProjectDetail from './ProjectDetail';
import TitleCard from './TitleCard';
import SummaryTracker from '../cash-tracker/tracker/SummaryTracker';
const ProjectView = () => {
  const { refresh, refreshData, getProjectById, singleProject } = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();
  const [flickImages, setFlickImages] = useState([]);
  const [alert, setAlert] = useState({
    type: '',
    message: '',
  });
  const {
    query: { projectId },
  } = useRouter();

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
      type: 'success',
      message: 'Sucessfully Transfered Token',
    });
    getProjectById(projectId);
  }, [projectId]);

  return (
    <>
      <Grid container spacing={SPACING.GRID_SPACING}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={SPACING.GRID_SPACING}>
            <Grid item xs={12} md={12}>
              <ImageSlider list={flickImages} projectName={singleProject?.data?.name} />
              <InfoCard rahatChainData={rahatChainData} />
              <SummaryTracker />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <TitleCard rahatChainData={rahatChainData} />
            {false && (
              <Grid item xs={12} md={12}>
                <Alert severity={alert.type}> {alert?.message} </Alert>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              <ProjectDetail />
            </Grid>
          </Grid>

          {/* {role.srso} */}
          {/* {role.srso && <AgencyCash rahatChainData={rahatChainData} />} */}
          {/* {role.srsorep} */}
          {/* {role.srsorep && <DonorCash rahatChainData={rahatChainData} />} */}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={9}>
          <ProjectChart projectId={projectId} />
        </Grid>
      </Grid>
    </>
  );
};

ProjectView.propTypes = {};

export default ProjectView;
