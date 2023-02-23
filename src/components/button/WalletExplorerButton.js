import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@mui/material';
import truncateEthAddress from '@utils/truncateEthAddress';
import { BLOCKCHAIN_EXPLORER } from '@config';
import { Stack } from '@mui/system';
import Iconify from '@components/iconify';
import copyToClipboard from '@utils/copyToClipboard';

const WalletExplorerButton = ({
  address = 'N/A',
  type = 'tx',
  truncate = true,
  children,
  truncateLength = 4,
  copyButton = true,
  ...props
}) => (
  <Stack direction="row" spacing={0} justifyContent="flex-start" alignItems="center">
    <Button
      disabled={!address}
      {...props}
      href={`${BLOCKCHAIN_EXPLORER}/${type}/${address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children ? children : truncate ? truncateEthAddress(address, truncateLength) : address ?? 'N/A'}
    </Button>

    {copyButton && (
      <Tooltip title="Copy to clipboard">
        <Button
          padding={0}
          size="small"
          startIcon={<Iconify icon="bx:bx-copy" onClick={() => copyToClipboard(address)} />}
        />
      </Tooltip>
    )}
  </Stack>
);

WalletExplorerButton.propTypes = {
  address: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['tx', 'address', 'token', 'block']),
  props: PropTypes.object,
  children: PropTypes.node,
  truncate: PropTypes.bool,
  truncateLength: PropTypes.number,
  copyButton: PropTypes.bool,
};

export default WalletExplorerButton;
