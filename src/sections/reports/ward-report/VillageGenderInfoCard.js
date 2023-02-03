import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const WardGenderInfoCard = ({ selectedVillage }) => {
  const theme = useTheme();
  const { wardByGenderChart, getWardGenderChart } = useModuleContext();

  useEffect(() => {
    if (!selectedVillage) return;
    getWardGenderChart(selectedVillage);
  }, [getWardGenderChart, selectedVillage]);

  if (!selectedVillage || selectedVillage === 'undefined')
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
        title={`Gender Claim Distribution (${selectedVillage})`}
        chart={{
          colors: [
            theme.palette.primary.main,
            theme.palette.error.main,
            theme.palette.info.main,
            theme.palette.warning.main,
          ],
          options: {
            chart: {
              stacked: true,
            },
          },
          ...wardByGenderChart,
        }}
      />
    </Box>
  );
};

WardGenderInfoCard.propTypes = {
  selectedVillage: PropTypes.string.required,
};

export default WardGenderInfoCard;
