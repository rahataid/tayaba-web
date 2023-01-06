import React, { useEffect } from 'react';

import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { ActionMenu, ProjectViewComp } from './index';
import { useProjectContext } from '@contexts/projects';
import { useAuthContext } from 'src/auth/useAuthContext';

const PAGE_TITLE = `Project: Detail`;

export default function ProjectMainView(props) {
   
  const { themeStretch } = useSettingsContext();
  const { roles } = useAuthContext();
  const {projectId,actionMenuItems} = props;
  const { getProjectById,singleProject  } = useProjectContext();


  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId);
  }, [projectId]);
  

  return (
  
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <ProjectViewComp />
        </Container>
   
  );
}


