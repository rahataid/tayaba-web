import { m } from 'framer-motion';
// next
import Head from 'next/head';
// @mui
import { Button, Typography } from '@mui/material';
// layouts
import CompactLayout from '@layouts/compact/CompactLayout';
// components
import { MotionContainer, varBounce } from '@components/animate';

// ----------------------------------------------------------------------
import ConnectWalletButton from '@components/connect-wallet/ConnectWalletButton';
import useWalletConnection from '@hooks/useWalletConnection';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

ConnectWallet.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ConnectWallet() {
  const { isWalletConnected } = useWalletConnection();
  const router = useRouter();
  const destinationRoute = router.query?.destinationRoute;
  const destinationPath = destinationRoute ? JSON?.parse(destinationRoute)?.path : '';

  useEffect(() => {
    if (isWalletConnected) {
      if (destinationPath) {
        router.push(destinationPath);
        return;
      }
      router.back();
    }
  }, [isWalletConnected]);

  return (
    <>
      <Head>
        <title> Connect Wallet</title>
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Please Connect a Wallet !
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            Sorry, you need to connect a wallet to move further.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ConnectWalletButton />
        </m.div>

        <Button
          sx={{ mt: 2 }}
          size="large"
          variant="contained"
          onClick={() => {
            router.back();
          }}
        >
          Go back
        </Button>
      </MotionContainer>
    </>
  );
}