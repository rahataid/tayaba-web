/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { TableContainer } from '@sections/beneficiaries';
import { BeneficiaryProvider } from '@contexts/beneficiaries';

const PAGE_TITLE = 'Beneficiaries';

export default function BeneficiaryList() {
  const { themeStretch } = useSettingsContext();

  return (
    <BeneficiaryProvider>
      <Page title={PAGE_TITLE}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </BeneficiaryProvider>
  );
}

BeneficiaryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
