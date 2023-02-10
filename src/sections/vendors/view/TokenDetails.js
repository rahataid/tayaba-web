import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import SummaryCard from '@components/SummaryCard';

TokenDetails.propTypes = {
  chainData: PropTypes.object,
};

export default function TokenDetails({ chainData }) {
  return (
    <>
      <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <SummaryCard
          title="Balance"
          total={chainData?.allowance}
          sx={{ width: '100%', maxWidth: 200 }}
          subtitle="tokens"
        />
        <SummaryCard
          title="Pending"
          total={chainData?.pendingTokens}
          sx={{ width: '100%', maxWidth: 200 }}
          subtitle="tokens"
          color="warning"
        />
        <SummaryCard
          title="Disbursed"
          total={chainData?.vendorBalance || 0}
          sx={{ width: '100%', maxWidth: 200 }}
          subtitle="tokens"
          color="info"
        />
      </Stack>
    </>
  );
}
