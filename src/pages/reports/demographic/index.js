import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { DemographicChartsView } from '@sections/reports/demographic';
import { ReportsProvider } from '@contexts/reports';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Reports: Demographic ';

DemographicReports.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function DemographicReports() {
  const { themeStretch } = useSettingsContext();

  return (
    <ReportsProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <DemographicChartsView />
        </Container>
      </Page>
    </ReportsProvider>
  );
}
