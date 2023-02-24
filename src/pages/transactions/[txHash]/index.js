import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';
import { Container } from '@mui/system';
import { TransactionViewComp } from '@sections/transactions/view';

const PAGE_TITLE = 'Transaction: View';

export default function TransactionView() {
  const { themeStretch } = useSettingsContext();

  return (
    // <BeneficiaryProvider>
    <Page title={PAGE_TITLE} nocard>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <TransactionViewComp />
      </Container>
    </Page>
    // </BeneficiaryProvider>
  );
}

TransactionView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
