import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { WardWiseReportComp, WardWiseContextProvider } from '@sections/reports/ward-report';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Reports: Ward Wise ';

WardWiseReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function WardWiseReport() {
  const { themeStretch } = useSettingsContext();

  return (
    <WardWiseContextProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <WardWiseReportComp />
        </Container>
      </Page>
    </WardWiseContextProvider>
  );
}
