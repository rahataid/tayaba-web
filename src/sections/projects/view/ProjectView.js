import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
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
import CashActionsAlert from './CashActionsAlert';
const ProjectView = () => {
  const { getProjectById, singleProject } = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();
  const [flickImages, setFlickImages] = useState([]);

  const {
    query: { projectId },
  } = useRouter();

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
  }, [projectId, alert.show]);

  return (
    <>
      <Grid container spacing={SPACING.GRID_SPACING}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={SPACING.GRID_SPACING}>
            <Grid item xs={12} md={12}>
              <ImageSlider list={flickImages} projectName={singleProject?.data?.name} />
              <InfoCard />
              <SummaryTracker />
              <ProjectChart projectId={projectId} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <TitleCard rahatChainData={rahatChainData} />
            <CashActionsAlert projectId={projectId} />
            <Grid item xs={12} md={12}>
              <ProjectDetail />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

ProjectView.propTypes = {};

export default ProjectView;
