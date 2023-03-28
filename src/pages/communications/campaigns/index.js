/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Button, Container } from '@mui/material';
import { CampaignsListView } from '@sections/communications/campaigns';
import { CommunicationsProvider } from '@contexts/communications';
import { useRouter } from 'next/router';
import { PATH_COMMUNICATION } from '@routes/paths';

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
