import React from 'react';
import PropTypes from 'prop-types';
import { Grid} from '@mui/material';
import { useProjectContext } from '@contexts/projects';
import SummaryCard from '@components/SummaryCard';
import { useTheme } from '@mui/system';

InfoCard.propTypes = {
  rahatChainData: PropTypes.object,
};

export default function InfoCard({ rahatChainData}) {
  const { beneficiaryCount } = useProjectContext();
  const sx= { borderRadius: 2,}
  return (
       <Grid container alignItems="flex-start" justifyContent="center">
        <Grid item xs={12} md={4} style={{padding:'8px',}} >
            <SummaryCard
              color="warning"
              icon="material-symbols:person-4"
              title="Beneficiaries"
              total={beneficiaryCount}
              subtitle={'households'}
              sx={sx}
            />
          </Grid>
          <Grid item xs={12} md={4} style={{padding:'8px'}}>
            <SummaryCard
              color="success"
              icon="material-symbols:token"
              title="Token Issued"
              total={beneficiaryCount}
              subtitle={'tokens'}
              sx={sx}
            />
          </Grid>
          <Grid item xs={12} md={4} style={{padding:'8px'}}>
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