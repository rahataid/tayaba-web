import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import BudgetInfo from './BudgetInfo';
import AddTokenInput from './AddTokenInput';

const BudgetCard = (props) => (
  <Box>
    <BudgetInfo />
    <AddTokenInput />
  </Box>
);

BudgetCard.propTypes = {};

export default BudgetCard;
