/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { ProjectAdd } from '@sections/projects/add';
import { ProjectProvider } from '@contexts/projects';

const PAGE_TITLE = 'Project: Add';

export default function ProjectAddView() {
  const { themeStretch } = useSettingsContext();

  return (
    <ProjectProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <ProjectAdd />
        </Container>
      </Page>
    </ProjectProvider>
  );
}

ProjectAddView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
