/* eslint-disable import/no-unresolved */
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { ProjectProvider } from '@contexts/projects';
import DashboardLayout from '@layouts/dashboard';
import { Container } from '@mui/material';
import EditInfo from '@sections/projects/edit/EditInfo';

const PAGE_TITLE = 'Project: Edit';

export default function ProjectEditView() {
  const { themeStretch } = useSettingsContext();

  return (
    <ProjectProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <EditInfo />
        </Container>
      </Page>
    </ProjectProvider>
  );
}

ProjectEditView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
