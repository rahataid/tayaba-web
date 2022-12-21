import React from 'react';
import PropTypes from 'prop-types';

import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container, Grid, Stack } from '@mui/material';
import { BudgetCard } from '@sections/projects/add-budget';

const PAGE_TITLE = 'Project: Add Budget';

const AddBudget = (props) => {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title={PAGE_TITLE}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <BudgetCard />
      </Container>
    </Page>
  );
};

AddBudget.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

AddBudget.propTypes = {};

export default AddBudget;
