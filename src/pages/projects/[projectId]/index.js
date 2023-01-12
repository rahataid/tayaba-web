import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { ProjectViewComp } from '@sections/projects/view';
import { ProjectProvider } from '@contexts/projects';

export default function ProjectView() {
  const { themeStretch } = useSettingsContext();

  return (
    <ProjectProvider>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ProjectViewComp />
      </Container>
    </ProjectProvider>
  );
}

ProjectView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

ProjectView.propTypes = {};
