import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const WardDisabilityInfoCard = ({ selectedWard }) => {
  const theme = useTheme();
  const { wardByDisability, getWardDisabilityChart } = useModuleContext();

  useEffect(() => {
    if (!selectedWard) return;
    getWardDisabilityChart(selectedWard);
  }, [getWardDisabilityChart, selectedWard]);

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
        title={`People with Disability (Ward ${selectedWard})`}
        chart={{
          colors: [
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.primary.main,
            theme.palette.warning.main,
          ],
          options: {
            chart: {
              stacked: true,
            },
          },
          ...wardByDisability,
        }}
      />
    </Box>
  );
};

WardDisabilityInfoCard.propTypes = {
  selectedWard: PropTypes.string.required,
};

export default WardDisabilityInfoCard;
