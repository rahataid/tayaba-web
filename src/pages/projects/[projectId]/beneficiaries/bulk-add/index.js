/* eslint-disable import/no-unresolved */
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { ProjectProvider } from '@contexts/projects';
import DashboardLayout from '@layouts/dashboard';
import { Container } from '@mui/material';
import { TableContainer } from '@sections/projects/beneficiaries/bulk-add';

const PAGE_TITLE = 'Project: Beneficiaries Bulk Add';

export default function BeneficiaryList() {
  const { themeStretch } = useSettingsContext();

  return (
    <ProjectProvider>
      <Page title={PAGE_TITLE}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <TableContainer />
        </Container>
      </Page>
    </ProjectProvider>
  );
}

BeneficiaryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
