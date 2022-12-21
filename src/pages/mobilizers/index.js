/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { TableContainer } from '@sections/mobilizers';
import { MobilizerProvider } from '@contexts/mobilizers';

const PAGE_TITLE = 'Mobilizers';

export default function MobilizersList() {
  const { themeStretch } = useSettingsContext();

  return (
    <MobilizerProvider>
      <Page title={PAGE_TITLE}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </MobilizerProvider>
  );
}

MobilizersList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
