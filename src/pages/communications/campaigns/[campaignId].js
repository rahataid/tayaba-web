import Iconify from '@components/iconify';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { SPACING } from '@config';
import { CommunicationsProvider } from '@contexts/communications';
import { useErrorHandler } from '@hooks/useErrorHandler';
import DashboardLayout from '@layouts/dashboard';
import { LoadingButton } from '@mui/lab';
import { Button, Container, Stack } from '@mui/material';
import { PATH_COMMUNICATION } from '@routes/paths';
import { SingleCampaignView } from '@sections/communications/campaigns/view';
import { CommunicationService } from '@services/communications';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Communication: View Campaign';

export default function BeneficiaryList() {
  const { themeStretch } = useSettingsContext();
  const {
    push,
    query: { projectId },
  } = useRouter();
  const { handleError } = useErrorHandler();

  const handleAdd = () => {
    push(PATH_COMMUNICATION.campaigns);
  };

  const triggerCampaign = () => {
    CommunicationService.triggerCampaign(projectId).catch(handleError);
  };

  return (
    <CommunicationsProvider>
      <Page
        nocard
        title={PAGE_TITLE}
        action={
          <Stack direction={'row'} spacing={SPACING.GRID_SPACING}>
            <LoadingButton
              variant={'outlined'}
              startIcon={<Iconify icon="grommet-icons:trigger" />}
              onClick={triggerCampaign}
            >
              Trigger Campaign
            </LoadingButton>
            <Button variant="text">Edit</Button>
            <Button onClick={handleAdd}>All Campaigns</Button>
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
