import { Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';

// ----------------------------------------------------------------------

const PAGE_TITLE = 'Reports: Anomaly ';

AnomalyReports.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function AnomalyReports() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title={PAGE_TITLE} nocard>
      <Container maxWidth={themeStretch ? false : 'xl'}>RealTime Reports</Container>
    </Page>
  );
}
