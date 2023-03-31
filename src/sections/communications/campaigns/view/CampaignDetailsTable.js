import JsonToTable from '@components/table/JsonToTable';
import { useCommunications } from '@contexts/communications';
import { Stack, Typography } from '@mui/material';

const CampaignDetailsTable = () => {
  const { singleCampaign } = useCommunications();

  return (
    <Stack>
      <Typography>Campaign Details: </Typography>

      <JsonToTable json={singleCampaign?.details || {}} />
    </Stack>
  );
};

export default CampaignDetailsTable;
