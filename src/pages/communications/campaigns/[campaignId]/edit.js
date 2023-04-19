import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { CommunicationsProvider } from '@contexts/communications';
import DashboardLayout from '@layouts/dashboard';
import { Button, Container } from '@mui/material';
import { PATH_COMMUNICATION } from '@routes/paths';
import { EditCampaign } from '@sections/communications/campaigns/edit';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Communication: Edit Campaign';

export default function BeneficiaryList() {
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();

  const handleListPush = () => {
    push(PATH_COMMUNICATION.campaigns);
  };

  return (
    <CommunicationsProvider>
      <Page
        title={PAGE_TITLE}
        action={
          <Button onClick={handleListPush} variant="outlined">
            All Campaigns
          </Button>
        }
      >
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <EditCampaign />
        </Container>
      </Page>
    </CommunicationsProvider>
  );
}

BeneficiaryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
