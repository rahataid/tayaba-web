import { SPACING } from '@config';
import { useCommunications } from '@contexts/communications';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CampaignInfoCard from './CampaignInfoCard';
import CampaignLogs from './CampaignLogs';

const CampaignsView = () => {
  const {
    query: { campaignId },
  } = useRouter();

  const { singleCampaign, getSingleCampaign, campaignLogs, getCampaignLogs } = useCommunications();

  console.log('campaignLogs', campaignLogs);

  useEffect(() => {
    getSingleCampaign(campaignId);
  }, [campaignId]);

  useEffect(() => {
    getCampaignLogs(campaignId);
  }, [campaignId]);

  return (
    <Stack direction="column" spacing={SPACING.GRID_SPACING}>
      <CampaignInfoCard campaign={singleCampaign} />
      <CampaignLogs logs={campaignLogs} />
    </Stack>
  );
};

export default CampaignsView;
