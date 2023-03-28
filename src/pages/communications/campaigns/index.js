import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { CommunicationsProvider } from '@contexts/communications';
import DashboardLayout from '@layouts/dashboard';
import { Button, Container } from '@mui/material';
import { PATH_COMMUNICATION } from '@routes/paths';
import { CampaignsListView } from '@sections/communications/campaigns';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Communication: Campaigns';

export default function BeneficiaryList() {
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();

  const handleAdd = () => {
    push(PATH_COMMUNICATION.createCampaigns);
  };

  return (
    <CommunicationsProvider>
      <Page
        title={PAGE_TITLE}
        action={
          <Button onClick={handleAdd} variant="outlined">
            Create a campaign
          </Button>
        }
      >
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CampaignsListView />
        </Container>
      </Page>
    </CommunicationsProvider>
  );
}

BeneficiaryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
