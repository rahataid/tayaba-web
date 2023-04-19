/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Button, Container } from '@mui/material';
import { TableContainer } from '@sections/beneficiaries';
import { BeneficiaryProvider } from '@contexts/beneficiaries';
import { useRouter } from 'next/router';
import { PATH_PROJECTS } from '@routes/paths';

const PAGE_TITLE = 'Beneficiaries';

export default function BeneficiaryList() {
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();
  const handleAdd = () => {
    push(PATH_PROJECTS.addBeneficary);
  };

  return (
    <BeneficiaryProvider>
      <Page
        title={PAGE_TITLE}
        action={
          <Button onClick={handleAdd} variant="outlined">
            Add Beneficary
          </Button>
        }
      >
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </BeneficiaryProvider>
  );
}

BeneficiaryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
