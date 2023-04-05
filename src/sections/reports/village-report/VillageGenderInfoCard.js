import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const VillageGenderInfoCard = ({ selectedVillage }) => {
  const theme = useTheme();
  const { villageByGenderChart, getVillageGenderChart } = useModuleContext();

  useEffect(() => {
    if (!selectedVillage) return;
    getVillageGenderChart(selectedVillage);
  }, [getVillageGenderChart, selectedVillage]);

  if (!selectedVillage || selectedVillage === 'undefined')
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            No Distribution Point Selected
          </Typography>
          <Typography variant="h4" sx={{ color: theme.palette.text.secondary }}>
            Select a Distribution Point to view details
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
          ...villageByGenderChart,
        }}
      />
    </Box>
  );
};

VillageGenderInfoCard.propTypes = {
  selectedVillage: PropTypes.string.required,
};

export default VillageGenderInfoCard;
