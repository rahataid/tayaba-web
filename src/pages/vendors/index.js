/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { TableContainer } from '@sections/vendors';
import { VendorProvider } from '@contexts/vendors';

const PAGE_TITLE = 'Vendors';

export default function VendorsList() {
  const { themeStretch } = useSettingsContext();

  return (
    <VendorProvider>
      <Page title={PAGE_TITLE}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </VendorProvider>
  );
}

VendorsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
