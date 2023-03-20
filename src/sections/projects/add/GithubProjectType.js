import {React, useState, useEffect} from 'react';
import { Stack, Grid } from '@mui/material';
import { RHFSelect } from '@components/hook-form';
import { getFolders } from '@services/github';

const GithubProjectType = () => {
    const [folders, setFolders] = useState([]);

    // const content = "bW9kdWxlLmV4cG9ydHMgPSB7CiAgT1RQOiAidGJsT3RwcyIsCiAgVVNFUjog\nInRibFVzZXJzIiwKICBBVVRIOiAidGJsQXV0aHMiLAogIFJPTEU6ICJ0YmxS\nb2xlcyIsCiAgQkVORUZJQ0lBUklFUzogInRibEJlbmVmaWNpYXJpZXMiLAog\nIFBST0pFQ1RTOiAidGJsUHJvamVjdHMiLAogIFZJTExBR0VTIDogInRibFZp\nbGxhZ2VzIiwKICBQUk9KRUNUX0JFTkVGRUNJQVJJRVMgOiAidGJsUHJvamVj\ndEJlbmVmaWNpYXJpZXMiLAogIFBST0pFQ1RfVkVORE9SUyA6ICJ0YmxQcm9q\nZWN0VmVuZG9ycyIsCiAgVkVORE9SIDogInRibFZlbmRvcnMiCn07Cg==\n";
    // const decodedContent = atob(content);
    // console.log(decodedContent);


    const fetchProjectFolders = async() => {
        const projectsTypes = await getFolders ('rahataid', 'tayaba');
        setFolders(projectsTypes);
    }

    useEffect(() => {   
        fetchProjectFolders();
    },[]);

  return (
    <>
     <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <RHFSelect name={'projectsTypes'} label="Select Project Type">
            {' '}
            <option value="" />
            {folders?.map((folder) => (
                  <option key={folder.name} value={folder.name}>
                    {folder.name}
                  </option>
                ))
            }
          </RHFSelect>
        </Stack>
      </Grid> 
    </>
  )
}

export default GithubProjectType
