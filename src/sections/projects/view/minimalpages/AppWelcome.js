import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Grid, Button } from '@mui/material';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
import BasicInfoCard from '../BasicInfoCard';
// ----------------------------------------------------------------------
import { useProjectContext } from '@contexts/projects';
import MoreInfoCard from '../MoreInfoCard';

const StyledRoot = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
  color: theme.palette.primary.darker,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const StyledBg = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: theme.palette.common.white,
  '&:before': {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -2,
    content: '""',
    opacity: 0.2,
    ...bgGradient({
      direction: '135deg',
      startColor: theme.palette.primary.light,
      endColor: theme.palette.primary.main,
    }),
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {

  projectId: PropTypes.string,
};

export default function AppWelcome({ ...other }) {
  const { singleProject } = useProjectContext();
  console.log({ singleProject })
  return (
    <StyledRoot {...other}>
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          pl: 5,
          py: { xs: 5, md: 0 },
          pr: { xs: 5, md: 0 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Grid container>
        <Grid item xs={12} md={6}>
        <Typography paragraph variant="h4" sx={{ whiteSpace: 'pre-line' }}>
          {singleProject?.data?.name}
        </Typography>
        </Grid>
        <Grid item spacing={1}xs={12} md={6}>
        <Button  variant="text"> Beneficaries</Button>
        <Button variant="text"> Vendors</Button>
        <Button variant="text"> Mobilizers</Button>

        </Grid>

        </Grid>
        
        <BasicInfoCard />
        <MoreInfoCard />
      </Stack>
      <StyledBg />
    </StyledRoot>
  );
}
