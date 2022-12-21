import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useBeneficiaryContext } from '@contexts/beneficiaries';

const ProjectsInvolved = (props) => {
  const router = useRouter();
  const { singleBeneficiary } = useBeneficiaryContext();

  const handleProjectClick = (id) => () => {
    router.push(`/projects/${id}`);
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5">Projects Involved</Typography>

        <Box>
          {singleBeneficiary?.projects?.map((project) => (
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
