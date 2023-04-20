/* eslint-disable import/no-unresolved */
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { ProjectProvider } from '@contexts/projects';
import DashboardLayout from '@layouts/dashboard';
import { Container } from '@mui/material';
import { TableContainer } from '@sections/projects/distributors';

const PAGE_TITLE = 'Project: Distributors';

export default function DistibutorsList() {
  const { themeStretch } = useSettingsContext();

  return (
    <ProjectProvider>
      <Page title={PAGE_TITLE}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </ProjectProvider>
  );
}

DistibutorsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
