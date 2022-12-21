import DashboardLayout from '@layouts/dashboard';
import { Page } from '@components/page';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { MobilizersView } from '@sections/mobilizers/view';
import { MobilizerProvider } from '@contexts/mobilizers';

const PAGE_TITLE = 'Mobilizers: Details';

const MobilizerView = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <MobilizerProvider>
      <Page title={PAGE_TITLE} nocard>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <MobilizersView />
        </Container>
      </Page>
    </MobilizerProvider>
  );
};

MobilizerView.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

MobilizerView.propTypes = {};

export default MobilizerView;
