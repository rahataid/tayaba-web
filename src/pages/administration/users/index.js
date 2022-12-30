/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { UserContainer } from '@sections/administration/users';
import { AdministrationProvider } from '@contexts/administration';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Users';

export default function UsersList() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();

  return (
    <AdministrationProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <UserContainer />
        </Container>
      </Page>
    </AdministrationProvider>
  );
}

UsersList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
