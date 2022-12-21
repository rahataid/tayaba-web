/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';

const PAGE_TITLE = 'App: Settings';

export default function AppSettings() {
  const { themeStretch } = useSettingsContext();
  const { contracts, addresses } = useAuthContext();
  return (
    <Page title={PAGE_TITLE}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {JSON.stringify(contracts, null, 2)}
        {JSON.stringify(addresses, null, 2)}
      </Container>
    </Page>
  );
}

AppSettings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
