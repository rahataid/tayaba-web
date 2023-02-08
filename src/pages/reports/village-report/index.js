import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { VillageWiseReportComp, VillageWiseContextProvider } from '@sections/reports/village-report';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Reports: Distribution Point Wise ';

WardWiseReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function WardWiseReport() {
  const { themeStretch } = useSettingsContext();

  return (
    <VillageWiseContextProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <VillageWiseReportComp />
        </Container>
      </Page>
    </VillageWiseContextProvider>
  );
}
