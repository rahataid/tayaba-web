/* eslint-disable import/no-unresolved */
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { FinancialInstitutionsProvider } from '@contexts/financial-institutions';
import { FIView } from '@sections/financial-institutions/view';

const PAGE_TITLE = 'Financial Institutions: Details';

export default function FIList() {
  const { themeStretch } = useSettingsContext();

  return (
    <FinancialInstitutionsProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <FIView />
        </Container>
      </Page>
    </FinancialInstitutionsProvider>
  );
}

FIList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
