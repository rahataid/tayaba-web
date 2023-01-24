import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Grid } from '@mui/material';
// utils
import { bgGradient } from '../../../utils/cssStyles';
import BasicInfoCard from './BasicInfoCard';
// ----------------------------------------------------------------------
import MoreInfoCard from './MoreInfoCard';

const StyledRoot = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
  // color: theme.palette.primary.darker,
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
      // startColor: theme.palette.primary.light,
      // endColor: theme.palette.primary.main,
    }),
  },
}));

// ----------------------------------------------------------------------

ProjectDetail.propTypes = {
  projectId: PropTypes.string,
};

export default function ProjectDetail({ ...other }) {
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
          paddingTop: '10px',
        }}
      >
        <Grid>
          <BasicInfoCard />
          <MoreInfoCard />
        </Grid>
      </Stack>
      <StyledBg />
    </StyledRoot>
  );
}
