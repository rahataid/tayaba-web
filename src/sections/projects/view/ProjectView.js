import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import InfoCard from './InfoCard';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { SPACING } from '@config';
import ProjectChart from './ProjectCharts';
import { getFlickrImages } from '@services/flickr';
import ImageSlider from './ImageSlider';
import ProjectDetail from './ProjectDetail';
import TitleCard from './TitleCard';
import SummaryTracker from './SummaryTracker';
import CashActionsAlert from './CashActionsAlert';
import { useProject } from '@services/contracts/useProject';
import { useRahatToken } from '@services/contracts/useRahatToken';
import LockProject from './LockProject';
import useLoading from '@hooks/useLoading';
import LoadingOverlay from '@components/LoadingOverlay';

const ProjectView = () => {
  const { getProjectById, singleProject, refreshData, refresh } = useProjectContext();
  const { getTokenAllowance, getProjectBalance, h2oToken, isProjectLocked } = useProject();
  const { contractWS: RahatTokenWS } = useRahatToken();
  const { loading, showLoading, hideLoading } = useLoading();
  const [pageLoading, setPageLoading] = useState(true);

  const [flickImages, setFlickImages] = useState([]);
  const [chainData, setChainData] = useState({});

  const {
    query: { projectId },
  } = useRouter();

  const updateChainData = (d) => {
    setChainData((prevState) => ({
      ...prevState,
      ...d,
    }));
  };

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

  let getDataFromChain = useCallback(async () => {
    let tokenAllowance = await getTokenAllowance();
    let projectBalance = await getProjectBalance();
    const isLocked = await isProjectLocked();
    //TODO :trigger Inventory tracker data;
    updateChainData({ tokenAllowance, projectBalance, isLocked });
    hideLoading('project-view');
  }, [h2oToken, refresh]);

  useEffect(() => {
    getDataFromChain();
  }, [getDataFromChain]);

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId);
  }, [projectId, alert.show]);

  useEffect(() => {
    RahatTokenWS?.on('Approval', getDataFromChain);
    RahatTokenWS?.on('Transfer', getDataFromChain);
    return () => RahatTokenWS?.removeAllListeners();
  }, [RahatTokenWS]);

  // if (pageLoading) return <div>Loading...</div>;

  return (
    <LoadingOverlay open={loading['project-view']}>
      <Grid container spacing={SPACING.GRID_SPACING}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={SPACING.GRID_SPACING}>
            <Grid item xs={12} md={12}>
              <ImageSlider list={flickImages} projectName={singleProject?.data?.name} />
              <InfoCard chainData={chainData} />
              <SummaryTracker />
              <ProjectChart projectId={projectId} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <TitleCard refreshData={getDataFromChain} />

            <LockProject chainData={chainData} refreshData={refreshData} />

            <CashActionsAlert projectId={projectId} chainData={chainData} />
            <Grid item xs={12} md={12}>
              <ProjectDetail />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LoadingOverlay>
  );
};

ProjectView.propTypes = {};

export default ProjectView;
