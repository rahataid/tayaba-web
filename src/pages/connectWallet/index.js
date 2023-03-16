import { m } from 'framer-motion';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Button, Typography } from '@mui/material';
// layouts
import CompactLayout from '@layouts/compact/CompactLayout';
// components
import { MotionContainer, varBounce  } from '@components/animate';
// assets
import { PageNotFoundIllustration } from 'src/assets/illustrations';
// ----------------------------------------------------------------------

ConnectWallet.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ConnectWallet() {
  return (
    <>
      <Head>
        <title> Connect Wallet</title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Please Conenct a Wallet ! 
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, you need to connect a wallet to move further.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

          <Button size="large" variant="contained" 
            onClick={() => {
                window.history.back();
            }}>
            Go back
          </Button>
      </MotionContainer>
    </>
  );
}
