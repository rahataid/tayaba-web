import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const VillageInternetAccessInfoCard = ({ selectedVillage }) => {
  const theme = useTheme();
  const { villageByInternetAccess, getVillageByInternetAccess } = useModuleContext();

  useEffect(() => {
    if (!selectedVillage) return;
    getVillageByInternetAccess(selectedVillage);
  }, [getVillageByInternetAccess, selectedVillage]);

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
        title={`People with Internet Accesss ( ${selectedVillage})`}
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
          ...villageByInternetAccess,
        }}
      />
    </Box>
  );
};

VillageInternetAccessInfoCard.propTypes = {
  selectedVillage: PropTypes.string.required,
};

export default VillageInternetAccessInfoCard;
