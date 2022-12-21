import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProjectContext } from '@contexts/projects';
import ProjectsList from './ProjectsList';

const TableContainer = () => {
  const router = useRouter();

  const { projects, getProjectsList } = useProjectContext();

  useEffect(() => {
    getProjectsList();
  }, []);

  const handleView = (id) => () => {
    router.push(`/projects/${id}`);
  };
  return (
    <Box sx={{ p: 1 }}>
      <ProjectsList list={projects} onClick={handleView} />
    </Box>
  );
};

export default TableContainer;
