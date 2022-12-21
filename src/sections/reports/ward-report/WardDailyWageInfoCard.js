import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const WardDailyWage = ({ selectedWard }) => {
  const theme = useTheme();
  const { dailyWageByWard, getWardDailyWageChart } = useModuleContext();

  useEffect(() => {
    if (!selectedWard) return;
    getWardDailyWageChart(selectedWard);
  }, [getWardDailyWageChart, selectedWard]);

  if (!selectedWard || selectedWard === 'undefined')
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            No Ward Selected
          </Typography>
          <Typography variant="h4" sx={{ color: theme.palette.text.secondary }}>
            Select a ward to view details
          </Typography>
        </CardContent>
      </Card>
    );

  return (
    <Box>
      <BarchartSingle
        title={`Daily Wage Workers (Ward ${selectedWard})`}
        chart={{
          colors: [
            theme.palette.warning.main,
            theme.palette.error.main,
            theme.palette.primary.main,
            theme.palette.info.main,
          ],
          options: {
            chart: {
              stacked: true,
            },
          },
          ...dailyWageByWard,
        }}
      />
    </Box>
  );
};

WardDailyWage.propTypes = {
  selectedWard: PropTypes.string.required,
};

export default WardDailyWage;
