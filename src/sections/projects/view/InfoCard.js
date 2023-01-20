import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import SummaryCard from '@components/SummaryCard';
import { useTheme } from '@mui/system';
import { useProject } from '@services/contracts/useProject';

InfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function InfoCard({}) {
  const { getProjectBalance, h2oToken } = useProject();

  const { beneficiaryCount } = useProjectContext();
  const sx = { borderRadius: 2 };
  const [balance, setbalance] = useState(0);
  useEffect(async () => {
    // let amt = await getProjectBalance();
    // console.log(amt);
    setbalance(100);
  }, [h2oToken]);
  return (
    <Grid container alignItems="flex-start" justifyContent="center" paddingTop={3}>
      <Grid item xs={12} md={4} style={{ padding: '8px' }}>
        <SummaryCard
          color="warning"
          icon="material-symbols:person-4"
          title="Beneficiaries"
          total={beneficiaryCount}
          subtitle={'households'}
          sx={sx}
        />
      </Grid>
      <Grid item xs={12} md={4} style={{ padding: '8px' }}>
        <SummaryCard
          color="success"
          icon="material-symbols:token"
          title="Token Issued"
          total={balance > 0 ? balance : <Button > Add Budget</Button>}
          subtitle={balance > 0 ? 'tokens' : '  '}
          sx={sx}
        />
      </Grid>
      <Grid item xs={12} md={4} style={{ padding: '8px' }}>
        <SummaryCard
          color="error"
          icon="ph:currency-circle-dollar-light"
          title="Token Redemed"
          total="0"
          subtitle={'tokens'}
          sx={sx}
        />
      </Grid>
    </Grid>
  );
}
