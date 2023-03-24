import React from 'react';
import { Container } from '@mui/material';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';

import { BeneficiaryAddComp } from '@sections/beneficiaries/add';
import { BeneficiaryProvider } from '@contexts/beneficiaries';

const PAGE_TITLE = 'Beneficiary: Add';

const BeneficiaryAddView = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <BeneficiaryProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <BeneficiaryAddComp />
        </Container>
      </Page>
    </BeneficiaryProvider>
  );
};

BeneficiaryAddView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

BeneficiaryAddView.propTypes = {};

export default BeneficiaryAddView;
