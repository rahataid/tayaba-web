import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { CommunicationsProvider } from '@contexts/communications';
import DashboardLayout from '@layouts/dashboard';
import { Button, Container } from '@mui/material';
import { PATH_COMMUNICATION } from '@routes/paths';
import { CreateCampaignView } from '@sections/communications/campaigns/create';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Communication: Create Campaign';

export default function BeneficiaryList() {
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();

  const handleAdd = () => {
    push(PATH_COMMUNICATION.campaigns);
  };

  return (
    <CommunicationsProvider>
      <Page
        title={PAGE_TITLE}
        action={
          <Button onClick={handleAdd} variant="outlined">
            All Campaigns
          </Button>
        }
      >
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CreateCampaignView />
        </Container>
      </Page>
    </CommunicationsProvider>
  );
}

BeneficiaryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
