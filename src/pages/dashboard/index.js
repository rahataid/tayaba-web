import { Chip, Container } from '@mui/material';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { DashboardComponent } from '@sections/dashboard';
import { ContextProvider } from '@sections/dashboard/context';
import { DashboardProvider } from '@contexts/dashboard';

// ----------------------------------------------------------------------

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Dashboard() {
  const { themeStretch } = useSettingsContext();

  return (
    <DashboardProvider>
      <ContextProvider>
        <Page title="" nocard>
          <Container maxWidth={themeStretch ? false : 'xl'}>
            <DashboardComponent />
          </Container>
        </Page>
      </ContextProvider>
    </DashboardProvider>
  );
}
