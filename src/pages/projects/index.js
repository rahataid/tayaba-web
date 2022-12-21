/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { TableContainer } from '@sections/projects';
import { ProjectProvider } from '@contexts/projects';

const PAGE_TITLE = 'Projects';

export default function ProjectsList() {
  const { themeStretch } = useSettingsContext();

  return (
    <ProjectProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </ProjectProvider>
  );
}

ProjectsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
