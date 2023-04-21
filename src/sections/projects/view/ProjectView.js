import LoadingOverlay from '@components/LoadingOverlay';
import { SPACING } from '@config';
import { useProjectContext } from '@contexts/projects';
import useLoading from '@hooks/useLoading';
import { Grid } from '@mui/material';
import { useProject } from '@services/contracts/useProject';
import { useRahatToken } from '@services/contracts/useRahatToken';
import { getFlickrImages } from '@services/flickr';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import ImageSlider from './ImageSlider';
import InfoCard from './InfoCard';
import LoadingSkeleton from './LoadingSkeleton';
import ProjectChart from './ProjectCharts';
import ProjectDetail from './ProjectDetail';
import SummaryTracker from './SummaryTracker';
import TitleCard from './TitleCard';
import TokenActionAlert from './TokenActionAlert';

const ProjectView = () => {
  const { getProjectByAddress, singleProject, refreshData, refresh } = useProjectContext();
  const { setContractAddress } = useAuthContext();
  const { getTokenAllowance, getProjectBalance, h2oToken, isProjectLocked, isProjectApproved } = useProject();
  const { contractWS: RahatTokenWS } = useRahatToken();
  const { loading, hideLoading } = useLoading();
  const [flickImages, setFlickImages] = useState([]);
  const [chainData, setChainData] = useState({});
  const {
    query: { projectId: contractAddress },
    push,
  } = useRouter();

  const updateChainData = (d) => {
    setChainData((prevState) => ({
      ...prevState,
      ...d,
    }));
  };
  useEffect(() => {
    console.log(singleProject)
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
    let projectBalance = await getProjectBalance(contractAddress);
    const isLocked = await isProjectLocked();
    const isApproved = await isProjectApproved();
    //TODO :trigger Inventory tracker data;
    updateChainData({ tokenAllowance, projectBalance, isLocked, isApproved });
    hideLoading('project-view');
  }, [h2oToken, refresh]);

  useEffect(() => {
    getDataFromChain();
  }, [getDataFromChain]);

  useEffect(() => {
    if (!contractAddress) return;
    getProjectByAddress(contractAddress);
    setContractAddress(contractAddress);
  }, [contractAddress, alert.show]);

  useEffect(() => {
    RahatTokenWS?.on('Approval', getDataFromChain);
    RahatTokenWS?.on('Transfer', getDataFromChain);
    return () => RahatTokenWS?.removeAllListeners();
  }, [RahatTokenWS]);

  // if (pageLoading) return <div>Loading...</div>;
  if (singleProject === null) {
    push('/404');
    return '';
  }

  return (
    <LoadingOverlay skeleton={<LoadingSkeleton />} open={loading['project-view']}>
      <Grid container spacing={SPACING.GRID_SPACING}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={SPACING.GRID_SPACING}>
            <Grid item xs={12} md={12}>
              <ImageSlider list={flickImages} projectName={singleProject?.name} />
              <InfoCard chainData={chainData} />
              <SummaryTracker />
              <ProjectChart projectId={singleProject?.id} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <TitleCard refreshData={getDataFromChain} chainData={chainData} />
            <TokenActionAlert projectId={singleProject?.id} chainData={chainData} refreshData={refreshData} />
            <Grid item xs={12} md={12}>
              <ProjectDetail chainData={chainData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LoadingOverlay>
  );
};

ProjectView.propTypes = {};

export default ProjectView;
