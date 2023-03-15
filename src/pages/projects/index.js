/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container, Button, Box } from '@mui/material';
import { TableContainer } from '@sections/projects';
import { ProjectProvider } from '@contexts/projects';
import { useRouter } from 'next/router';
import useWalletConnection from '@hooks/useWalletConnection';
import snackbar, { useSnackbar } from '@components/snackbar';

const PAGE_TITLE = 'Projects';

export default function ProjectsList() {
  const {isWalletConnected} = useWalletConnection();
  const { themeStretch } = useSettingsContext();
  const { push } = useRouter();
  const snackBar = useSnackbar();


  const handleAdd = () => {
    if (!isWalletConnected) {
      snackBar.enqueueSnackbar('Please connect a wallet.',
        {
          variant:'warning'
        }
      );
      return
    }
    push(`/projects/add`);
  };
  return (
    <ProjectProvider>
      <Page title={PAGE_TITLE} nocard action={<Button onClick={handleAdd} variant="outlined">Add Project</Button>}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </ProjectProvider>
  );
}

ProjectsList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
