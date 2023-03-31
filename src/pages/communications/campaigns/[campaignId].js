import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { SPACING } from '@config';
import { CommunicationsProvider } from '@contexts/communications';
import DashboardLayout from '@layouts/dashboard';
import { Button, Container, Stack } from '@mui/material';
import { PATH_COMMUNICATION } from '@routes/paths';
import { SingleCampaignView } from '@sections/communications/campaigns/view';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Communication: View Campaign';

export default function BeneficiaryList() {
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();

  const handleAdd = () => {
    push(PATH_COMMUNICATION.campaigns);
  };

  return (
    <CommunicationsProvider>
      <Page
        nocard
        title={PAGE_TITLE}
        action={
          <Stack direction={'row'} spacing={SPACING.GRID_SPACING}>
            <Button onClick={handleAdd} variant="outlined">
              All Campaigns
            </Button>
            <Button variant="text">Edit</Button>
          </Stack>
        }
      >
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <SingleCampaignView />
        </Container>
      </Page>
    </CommunicationsProvider>
  );
}

BeneficiaryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
