import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
import { APP_NAME } from '@config';
import Container from './Container';

// ----------------------------------------------------------------------

const Page = forwardRef(
  ({ children, title = '', meta, breadcrumbAction, breadcrumbLinks = [], nocard, showTitle = true, ...other }, ref) => (
    <>
      <Head>
        <title>{`${title ? title + ' |' : ''} ${APP_NAME}`}</title>
        {meta}
      </Head>
      <Box ref={ref} {...other}>
        <Container
          title={showTitle ? title : null}
          action={breadcrumbAction}
          breadcrumbLinks={breadcrumbLinks}
          nocard={nocard}
          {...other}
        >
          {children}
        </Container>
      </Box>
    </>
  )
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  showTitle: PropTypes.bool,
  title: PropTypes.string,
  meta: PropTypes.node,
  breadcrumbAction: PropTypes.node,
  breadcrumbLinks: PropTypes.array,
  nocard: PropTypes.bool,
};

export default Page;
