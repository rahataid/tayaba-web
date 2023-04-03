import { React, useState, useEffect } from 'react';
import { Stack, Grid } from '@mui/material';
import { RHFSelect } from '@components/hook-form';
import { useProjectContext } from '@contexts/projects';

const GithubProjectType = ({ fetchProjectFolders }) => {
  const { githubProjectTypes, getGithubProjectTypes } = useProjectContext();

  // const content = "WwogICAgewogICAgICAibmFtZSI6ICJudW1iZXJPZkJlbmVmaWNpYXJpZXMi\nLAogICAgICAiZmllbGRUeXBlIjogIm51bWJlciIsCiAgICAgICJpc1JlcXVp\ncmVkIjogdHJ1ZSwKICAgICAgImxhYmVsIjogIk5vIG9mIEJlbmVmaWNpYXJp\nZXMiCiAgICB9LAogICAgewogICAgICAibmFtZSI6ICJhbW91bnRQZXJCZW5l\nZmljaWFyeSIsCiAgICAgICJmaWVsZFR5cGUiOiAibnVtYmVyIiwKICAgICAg\nImlzUmVxdWlyZWQiOiB0cnVlLAogICAgICAibGFiZWwiOiAiQW1vdW50IGZv\nciBCZW5lZmljaWFyaWVzIgogICAgfSwKICAgIHsKICAgICAgIm5hbWUiOiAi\nQW50aWNpcGF0b3J5IEFjdGlvbiIsCiAgICAgICJmaWVsZFR5cGUiOiAidGV4\ndCIsCiAgICAgICJpc1JlcXVpcmVkIjogdHJ1ZSwKICAgICAgImxhYmVsIjog\nIkFudGljaXBhdG9yeSBBY3Rpb24iCiAgICB9CiAgXQ==\n";
  // const decodedContent = atob(content);
  // console.log(JSON.parse(decodedContent));

  useEffect(() => {
    getGithubProjectTypes();
  }, [getGithubProjectTypes]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFSelect name={'projectType'} label="Select Project Type">
            {' '}
            <option value="" />
            {githubProjectTypes?.map((folder) => (
              <option key={folder.name} value={folder.name}>
                {folder.name}
              </option>
            ))}
          </RHFSelect>
        </Stack>
      </Grid>
    </>
  );
};

export default GithubProjectType;
