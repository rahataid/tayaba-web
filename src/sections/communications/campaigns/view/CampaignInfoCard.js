import { Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';
import CampaignDetailsTable from './CampaignDetailsTable';

const CampaignInfoCard = ({ campaign }) => (
  <Card>
    <CardHeader title={campaign?.name} />
    <CardContent>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{campaign?.type}</Typography>
          <Typography variant="caption">Type</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{moment(campaign?.startTime).format('DD MMM, YYYY h:m a')}</Typography>
          <Typography variant="caption">Start Time</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{campaign?.status}</Typography>
          <Typography variant="caption">Status</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{campaign?.totalAudiences}</Typography>
          <Typography variant="caption">Total Audiences</Typography>
        </Grid>
      </Stack>

      <CampaignDetailsTable />
    </CardContent>
  </Card>
);

CampaignInfoCard.propTypes = {
  campaign: PropTypes.object,
};

export default CampaignInfoCard;
