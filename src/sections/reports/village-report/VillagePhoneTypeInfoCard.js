import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const VillagePhoneTypeInfoCard = ({ selectedVillage }) => {
  const theme = useTheme();
  const { villageByPhoneType, getVillageByPhoneType } = useModuleContext();

  useEffect(() => {
    if (!selectedVillage) return;
    getVillageByPhoneType(selectedVillage);
  }, [getVillageByPhoneType, selectedVillage]);

  if (!selectedVillage || selectedVillage === 'undefined')
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            No Village Selected
          </Typography>
          <Typography variant="h4" sx={{ color: theme.palette.text.secondary }}>
            Select a village to view details
          </Typography>
        </CardContent>
      </Card>
    );

  return (
    <Box>
      <BarchartSingle
        title={`By Phone Type ( ${selectedVillage})`}
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
          ...villageByPhoneType,
        }}
      />
    </Box>
  );
};

VillagePhoneTypeInfoCard.propTypes = {
  selectedVillage: PropTypes.string.required,
};

export default VillagePhoneTypeInfoCard;
