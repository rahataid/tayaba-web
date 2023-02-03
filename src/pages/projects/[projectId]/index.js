import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { ProjectViewComp } from '@sections/projects/view';
import { ProjectProvider } from '@contexts/projects';
import { Page } from '@components/page';
const PAGE_TITLE = 'Project Detail';

export default function ProjectView() {
  const { themeStretch } = useSettingsContext();

  return (
    <ProjectProvider>
      <Page title={PAGE_TITLE} nocard showTitle={false}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <ProjectViewComp />
        </Container>
      </Page>
    </ProjectProvider>
  );
}

ProjectView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

ProjectView.propTypes = {};
