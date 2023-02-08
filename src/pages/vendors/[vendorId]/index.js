import React from 'react';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { VendorView } from '@sections/vendors/view';
import { VendorProvider } from '@contexts/vendors';
import { useAuthContext } from 'src/auth/useAuthContext';

const PAGE_TITLE = 'Distributor : Details';

const VendorsView = () => {
  const { themeStretch } = useSettingsContext();
  const { roles } = useAuthContext();

  return (
    <VendorProvider>
      <Page
        title={PAGE_TITLE}
        nocard
        //  action={roles.isDonor && <ActionMenu actionTitle={'Actions'} >}
      >
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <VendorView />
        </Container>
      </Page>
    </VendorProvider>
  );
};

VendorsView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

VendorsView.propTypes = {};

export default VendorsView;
