import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const WardLandOwnershipInfoCard = ({ selectedWard }) => {
  const theme = useTheme();
  const { wardByLandOwnership, getWardLandOwnershipChart } = useModuleContext();

  useEffect(() => {
    if (!selectedWard) return;
    getWardLandOwnershipChart(selectedWard);
  }, [getWardLandOwnershipChart, selectedWard]);

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
        title={`By Land Ownership (Ward ${selectedWard})`}
        chart={{
          colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.warning.main,
          ],
          options: {
            chart: {
              stacked: true,
            },
          },
          ...wardByLandOwnership,
        }}
      />
    </Box>
  );
};

WardLandOwnershipInfoCard.propTypes = {
  selectedWard: PropTypes.string.required,
};

export default WardLandOwnershipInfoCard;
