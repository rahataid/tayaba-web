import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { DashboardProvider } from '@contexts/dashboard';
import DashboardLayout from '@layouts/dashboard';
import { Container } from '@mui/material';
import { DashboardComponent } from '@sections/dashboard';
import { ContextProvider } from '@sections/dashboard/context';

// ----------------------------------------------------------------------

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Dashboard() {
  const { themeStretch } = useSettingsContext();

  return (
    <DashboardProvider>
      <ContextProvider>
        <Page nocard>
          <Container maxWidth={themeStretch ? false : 'xl'}>
            <DashboardComponent />
          </Container>
        </Page>
      </ContextProvider>
    </DashboardProvider>
  );
}
