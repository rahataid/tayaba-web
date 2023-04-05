import JsonToTable from '@components/table/JsonToTable';
import { useCommunications } from '@contexts/communications';
import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

const CampaignDetailsTable = () => {
  const { singleCampaign } = useCommunications();

  return (
    <Card mt={2}>
      <CardHeader title={<Typography variant="caption1">Campaign Details: </Typography>} />
      <CardContent>
        <Stack mb={2}>
          <JsonToTable json={singleCampaign?.details || {}} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CampaignDetailsTable;
