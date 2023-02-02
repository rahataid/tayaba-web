import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import truncateEthAddress from '@utils/truncateEthAddress';
import { BLOCKCHAIN_EXPLORER } from '@config';

const WalletExplorerButton = ({ address, type = 'tx', children, ...props }) => (
  <Button
    disabled={!address}
    {...props}
    href={`${BLOCKCHAIN_EXPLORER}/${type}/${address}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children ? children : truncateEthAddress(address) || 'N/A'}
  </Button>
);

WalletExplorerButton.propTypes = {
  address: PropTypes.string.isRequired,
  type: PropTypes.string,
  props: PropTypes.object,
  children: PropTypes.node,
};

export default WalletExplorerButton;
