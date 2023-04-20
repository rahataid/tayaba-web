import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container as MuiContainer, IconButton, Stack } from '@mui/material';
import Iconify from '@components/iconify';
import { PATH_DASHBOARD } from '@routes/paths';
import Headerbreadcrumbs from '@components/HeaderBreadcrumbs';
import { useSettingsContext } from '@components/settings';

const ContainerComponent = ({ children, title, action, breadcrumbLinks, nocard = false }) => {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      {' '}
      <MuiContainer maxWidth={themeStretch ? false : 'lg'}>
        {/* <Headerbreadcrumbs
          heading={
            title && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  <Iconify icon="material-symbols:arrow-back-ios-rounded" />
                </IconButton>
                {title}
              </Stack>
            )
          }
          links={[{ name: '', href: PATH_DASHBOARD.root }, ...breadcrumbLinks]}
          action={action}
        /> */}
        {nocard ? children : <Card sx={{ p: 2 }}>{children}</Card>}
      </MuiContainer>
    </>
  );
};
ContainerComponent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  action: PropTypes.node,
  breadcrumbLinks: PropTypes.array,
  nocard: PropTypes.bool,
};

export default ContainerComponent;
