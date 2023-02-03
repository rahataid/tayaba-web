import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import BarchartSingle from './BarchartSingle';
import { useModuleContext } from './context';

const WardLandOwnershipInfoCard = ({ selectedVillage }) => {
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
        title={`By Land Ownership (Ward ${selectedVillage})`}
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

WardLandOwnershipInfoCard.propTypes = {
  selectedVillage: PropTypes.string.required,
};

export default WardLandOwnershipInfoCard;
