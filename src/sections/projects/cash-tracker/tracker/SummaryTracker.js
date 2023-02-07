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
import { ProjectService } from '@services/projects';
import { useCallback, useEffect, useState } from 'react';

const STEPS = [
  {
    label: 'Tayaba',
    budget: 0,
    balance: 0,
  },
  {
    label: 'SRSO',
    received: 0,
    balance: 0,
  },
  {
    label: 'Local Rep',
    received: 0,
    balance: 0,
  },
  {
    label: 'Distribution Point Rep',
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
    const res = await ProjectService.getTrackerData('inventory-tracker');
    let _tData = res.data.data;

    setTrackData([_tData.tayaba, _tData.srso, _tData.local_rep, _tData.village_rep, _tData.beneficiaries]);
    if (_tData.tayaba.isActive) setActiveStep(1);
    if (_tData.srso.isActive) setActiveStep(2);
    if (_tData.local_rep.isActive) setActiveStep(3);
    if (_tData.village_rep.isActive) setActiveStep(4);
    if (_tData.beneficiaries.isActive) setActiveStep(5);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const renderBalance = (step) => {
    if (step?.label === 'Tayaba')
      return (
        <>
          <Typography variant="caption">Budget: {step.budget} </Typography>
          <Typography variant="caption">Balance: {step.balance} </Typography>
        </>
      );
    if (step?.label === 'Village Rep')
      return (
        <>
          <Typography variant="caption">Received: {step.received} </Typography>
          <Typography variant="caption">Disbursed: {step.disbursed} </Typography>
        </>
      );
    if (step?.label === 'Beneficiaries')
      return (
        <>
          <Typography variant="caption">Claims: {step.claims} </Typography>
          <Typography variant="caption">Received: {step.received} </Typography>
        </>
      );
    return (
      <>
        <Typography variant="caption">Received: {step?.received} </Typography>
        <Typography variant="caption">Balance: {step?.balance} </Typography>
      </>
    );
  };

  return (
    <Grid container xs={12} md={12} paddingTop={3} paddingBottom={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Inventory Tracker" />
          <Stepper alternativeLabel activeStep={activeStep} connector={<StepConnector />} sx={{ m: 2, ...sx }}>
            {trackData?.map((step) => (
              <Step key={step?.label}>
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
        </Card>
      </Grid>
    </Grid>
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
