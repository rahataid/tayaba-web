import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { BeneficiaryProvider } from '@contexts/beneficiaries';
import DashboardLayout from '@layouts/dashboard';
import { Container } from '@mui/material';
import BeneficiaryEdit from '@sections/beneficiaries/edit/EditInfo';

const PAGE_TITLE = 'Beneficiary: Edit';

const BeneficiaryEditView = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <BeneficiaryProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <BeneficiaryEdit />
        </Container>
      </Page>
    </BeneficiaryProvider>
  );
};

BeneficiaryEditView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

BeneficiaryEditView.propTypes = {};

export default BeneficiaryEditView;
