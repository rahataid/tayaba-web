import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const WardInfoCard = ({ selectedWard }) => {
  const theme = useTheme();
  const { wardByGenderChart, getWardGenderChart } = useModuleContext();

  useEffect(() => {
    if (!selectedWard) return;
    getWardGenderChart(selectedWard);
  }, [getWardGenderChart, selectedWard]);

  if (!selectedWard)
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
        title={`Ward Wise Gender Claim Distribution for Ward ${selectedWard}`}
        chart={{
          colors: [
            theme.palette.primary.main,
            theme.palette.info.main,
            theme.palette.error.main,
            theme.palette.warning.main,
          ],
          ...wardByGenderChart,
        }}
      />
    </Box>
  );
};

WardInfoCard.propTypes = {
  selectedWard: PropTypes.string.required,
};

export default WardInfoCard;
