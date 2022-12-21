/* eslint-disable import/no-unresolved */
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { TableContainer } from '@sections/financial-institutions';
import { FinancialInstitutionsProvider } from '@contexts/financial-institutions';

const PAGE_TITLE = 'Financial Institutions';

export default function FIList() {
  const { themeStretch } = useSettingsContext();

  return (
    <FinancialInstitutionsProvider>
      <Page title={PAGE_TITLE}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </FinancialInstitutionsProvider>
  );
}

FIList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
