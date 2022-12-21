import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// components
import { SkeletonProductItem } from '@components/skeleton';
//
import ProjectCard from './ProjectCard';

// ----------------------------------------------------------------------

ProjectCardList.propTypes = {
  loading: PropTypes.bool,
  list: PropTypes.array,
};

export default function ProjectCardList({ list, loading, ...other }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      {...other}
    >
      {(loading ? [...Array(12)] : list).map((project, index) =>
        project ? <ProjectCard key={project.id} project={project} /> : <SkeletonProductItem key={index} />
      )}
    </Box>
  );
}
