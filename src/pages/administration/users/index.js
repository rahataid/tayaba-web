/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Button, Container } from '@mui/material';
import { UserContainer } from '@sections/administration/users';
import { AdministrationProvider } from '@contexts/administration';
import { useRouter } from 'next/router';
import { PATH_ADMINISTRATION } from '@routes/paths';

const PAGE_TITLE = 'Users';

export default function UsersList() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();

  return (
    <AdministrationProvider>
      <Page title={PAGE_TITLE} nocard breadcrumbAction={<Button variant='contained' onClick={() => router.push(PATH_ADMINISTRATION.addUser)}> Add User</Button>} >
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <UserContainer />
        </Container>
      </Page>
    </AdministrationProvider>
  );
}

UsersList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
