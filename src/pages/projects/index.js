/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container, Button, Box } from '@mui/material';
import { TableContainer } from '@sections/projects';
import { ProjectProvider } from '@contexts/projects';
import { useRouter } from 'next/router';
import useWalletConnection from '@hooks/useWalletConnection';
import { useSnackbar } from '@components/snackbar';
import { PATH_CONNECT_WALLET, PATH_PROJECTS, stringifyDestinationRoute } from '@routes/paths';

const PAGE_TITLE = 'Projects';

export default function ProjectsList() {
  const { isWalletConnected } = useWalletConnection();
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();
  const snackBar = useSnackbar();

  const handleAdd = () => {
    if (!isWalletConnected) {
      snackBar.enqueueSnackbar('Please connect a wallet.', {
        variant: 'warning',
      });
      push({
        pathname: PATH_CONNECT_WALLET.root,
        query: stringifyDestinationRoute(PATH_PROJECTS.addProject),
      });
      return;
    }
    push(PATH_PROJECTS.addProject);
  };
  return (
    <ProjectProvider>
      <Page
        title={PAGE_TITLE}
        nocard
        action={
          <Button onClick={handleAdd} variant="outlined">
            Add Project
          </Button>
        }
      >
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </ProjectProvider>
  );
}

ProjectsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
