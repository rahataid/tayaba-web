import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import DashboardLayout from '@layouts/dashboard';
import { useSettingsContext } from '@components/settings';
import { useRouter } from 'next/router';
import { ProjectProvider } from '@contexts/projects';
import { useAuthContext } from 'src/auth/useAuthContext';
import ProjectMainView from '@sections/projects/view/ProjectMainView';

const PAGE_TITLE = `Project: Detail`;

export default function ProjectView(props) {
  const {
    push: routerPush,
    query: { projectId },
  } = useRouter();

  const actionMenuItems = [
    {
      name: 'Edit Project',
      href: `/projects/${projectId}/edit`,
      onClick: () => routerPush(`/projects/${projectId}/edit`),
    },
    {
      name: 'Add Budget',
      href: `/projects/${projectId}/add-budget`,
      onClick: () => routerPush(`/projects/${projectId}/add-budget`),
    },
  ];

  return (
    <ProjectProvider>
      <ProjectMainView projectId={projectId} actionMenuItems={actionMenuItems} />
    </ProjectProvider>
  );
}

ProjectView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

ProjectView.propTypes = {};
