import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useVendorsContext } from '@contexts/vendors';

const ProjectsInvolved = () => {
  const { singleVendor } = useVendorsContext();

  const router = useRouter();

  const handleProjectClick = (id) => () => {
    router.push(`/projects/${id}`);
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5">Projects Involved</Typography>

        <Box>
          {singleVendor?.projects?.map((project) => (
            <Button key={project.id} variant="outlined" sx={{ m: 1 }} onClick={handleProjectClick(project.id)}>
              {project.name}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

ProjectsInvolved.propTypes = {};

export default ProjectsInvolved;
