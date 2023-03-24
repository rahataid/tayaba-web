/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { ProjectAdd } from '@sections/projects/add';
import { ProjectProvider } from '@contexts/projects';
import useWalletConnection from '@hooks/useWalletConnection';
import { PATH_CONNECT_WALLET, PATH_PROJECTS, stringifyDestinationRoute } from '@routes/paths';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Project: Add';

export default function ProjectAddView() {
  const { themeStretch } = useSettingsContext();
  const {isWalletConnected} = useWalletConnection();
  const {push} = useRouter();

  
  useEffect(() => {
    if(isWalletConnected == false){
      push({
        pathname: PATH_CONNECT_WALLET.root,
        query: stringifyDestinationRoute(PATH_PROJECTS.addProject), 
      });
    }
  }, [isWalletConnected]);

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
