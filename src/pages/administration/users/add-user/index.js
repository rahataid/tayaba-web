/* eslint-disable import/no-unresolved */
import React from 'react';
import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Button, Container } from '@mui/material';
import { UserContainer } from '@sections/administration/users';
import { AdministrationProvider } from '@contexts/administration';
import { useRouter } from 'next/router';
import { UserAdd } from '@sections/administration/users/add-user';

const PAGE_TITLE = 'User: Add User';

export default function AddUser() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();

  return (
    <AdministrationProvider>
      <Page title={PAGE_TITLE} nocard >
        <Container maxWidth={themeStretch ? false : 'xl'}>
            <UserAdd/>
        </Container>
      </Page>
    </AdministrationProvider>
  );
}

AddUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
