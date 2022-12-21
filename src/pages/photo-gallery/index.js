import React from 'react';
import DashboardLayout from '@layouts/dashboard';

import { PhotoGalleryComp } from '@sections/photo-gallery';
import { Page } from '@components/page';
import { Container } from '@mui/material';
import { useSettingsContext } from '@components/settings';

const PAGE_TITLE = 'Photo Gallery';

const PhotoGallery = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title={PAGE_TITLE}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <PhotoGalleryComp
          sx={
            {
              // width: '100%',
              // height: 300,
            }
          }
        />
      </Container>
    </Page>
  );
};

PhotoGallery.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PhotoGallery;
