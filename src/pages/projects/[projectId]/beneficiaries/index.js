/* eslint-disable import/no-unresolved */
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { ProjectProvider } from '@contexts/projects';
import DashboardLayout from '@layouts/dashboard';
import { Button, Container } from '@mui/material';
import { PATH_PROJECTS } from '@routes/paths';
import { TableContainer } from '@sections/projects/beneficiaries';
import { useRouter } from 'next/router';

const PAGE_TITLE = 'Project: Beneficiaries';

export default function BeneficiaryList() {
  const { themeStretch } = useSettingsContext();
  const {
    push,
    query: { projectId },
  } = useRouter();

  const handleAdd = () => {
    push(`${PATH_PROJECTS.root}/${projectId}/beneficiaries/bulk-add`);
  };

  return (
    <ProjectProvider>
      <Page
        title={PAGE_TITLE}
        action={
          <Button onClick={handleAdd} variant="outlined">
            Bulk add
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

BeneficiaryList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
