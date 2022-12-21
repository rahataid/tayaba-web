import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_CASH_TRACKER } from '@routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == PATH_CASH_TRACKER.root) {
      router.push(PATH_CASH_TRACKER.tracker);
    }
  });

  return null;
}
