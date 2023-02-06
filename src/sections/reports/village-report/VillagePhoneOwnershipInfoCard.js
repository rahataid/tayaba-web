import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const VillagePhoneOwnershipInfoCard = ({ selectedVillage }) => {
  const theme = useTheme();
  const { villageByPhoneOwnership, getVillageByPhoneOwnership } = useModuleContext();

  useEffect(() => {
    if (!selectedVillage) return;
    getVillageByPhoneOwnership(selectedVillage);
  }, [getVillageByPhoneOwnership, selectedVillage]);

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
        title={`By phone Ownership ( ${selectedVillage})`}
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
          ...villageByPhoneOwnership,
        }}
      />
    </Box>
  );
};

VillagePhoneOwnershipInfoCard.propTypes = {
  selectedVillage: PropTypes.string.required,
};

export default VillagePhoneOwnershipInfoCard;
