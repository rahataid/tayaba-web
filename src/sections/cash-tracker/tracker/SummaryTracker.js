import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Step,
  Stack,
  Stepper,
  StepLabel,
  StepConnector as MUIStepConnector,
  Grid,
  Typography,
  Card,
  CardHeader,
} from '@mui/material';
// components
import Iconify from '@components/iconify';
import { DashboardService } from '@services/dashboard';
import { useCallback, useEffect, useState } from 'react';

const STEPS = [
  {
    label: 'Unicef Innovation Fund',
    budget: 0,
    balance: 0,
  },
  {
    label: 'Unicef Nepal',
    received: 0,
    balance: 0,
  },
  {
    label: 'Jaleshwor Palika',
    received: 0,
    balance: 0,
  },
  {
    label: 'Wards',
    received: 0,
    disbursed: 0,
  },
  {
    label: 'Beneficiaries',
    claims: 0,
    received: 0,
  },
];

// ----------------------------------------------------------------------

const StepConnector = styled(MUIStepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

// ----------------------------------------------------------------------

SummaryTracker.propTypes = {
  trackerSummary: PropTypes.array,
  sx: PropTypes.object,
};

export default function SummaryTracker({ sx, ...other }) {
  const [trackData, setTrackData] = useState(STEPS);
  const [activeStep, setActiveStep] = useState(0);

  const getData = useCallback(async () => {
    const res = await DashboardService.getCashTrackerSummary();
    let _tData = res.data.data;

    setTrackData([_tData.donor, _tData.agency, _tData.palika, _tData.wards, _tData.beneficiaries]);
    if (_tData.donor.isActive) setActiveStep(1);
    if (_tData.agency.isActive) setActiveStep(2);
    if (_tData.palika.isActive) setActiveStep(3);
    if (_tData.wards.isActive) setActiveStep(4);
    if (_tData.beneficiaries.isActive) setActiveStep(5);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const renderBalance = (step) => {
    if (step.label === 'Unicef Innovation Fund')
      return (
        <>
          <Typography variant="caption">Budget: {step.budget} </Typography>
          <Typography variant="caption">Balance: {step.balance} </Typography>
        </>
      );
    if (step.label === 'Wards')
      return (
        <>
          <Typography variant="caption">Received: {step.received} </Typography>
          <Typography variant="caption">Disbursed: {step.disbursed} </Typography>
        </>
      );
    if (step.label === 'Beneficiaries')
      return (
        <>
          <Typography variant="caption">Claims: {step.claims} </Typography>
          <Typography variant="caption">Received: {step.received} </Typography>
        </>
      );
    return (
      <>
        <Typography variant="caption">Received: {step.received} </Typography>
        <Typography variant="caption">Balance: {step.balance} </Typography>
      </>
    );
  };

  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<StepConnector />} sx={{ m: 2, ...sx }}>
      {trackData.map((step) => (
        <Step key={step.label}>
          <StepLabel
            StepIconComponent={StepIcon}
            sx={{
              '& .MuiStepLabel-label': {
                typography: 'subtitle2',
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography fontWeight={700} variant="caption">
                  {step?.label}
                </Typography>
                {renderBalance(step)}
              </Grid>
            </Stack>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

// ----------------------------------------------------------------------

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function StepIcon({ active, completed }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 24,
        height: 24,
        color: 'text.disabled',
        ...(active && {
          color: 'primary.main',
        }),
      }}
    >
      {completed ? (
        <Iconify icon="eva:checkmark-fill" sx={{ color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Stack>
  );
}
