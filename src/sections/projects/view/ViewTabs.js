import { useEffect, useState } from 'react';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Card, CardContent } from '@mui/material';
import TabsTable from './TabsTable';
import { BEN_TABLE_HEAD, MOB_TABLE_HEAD, VEN_TABLE_HEAD, mobilizers } from './tableData';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import ListTableToolbar from '../ListTableToolbar';
import { useAuthContext } from 'src/auth/useAuthContext';

const tabs = [
  { value: 'beneficiaries', label: 'Beneficiaries' },
  { value: 'vendors', label: 'Vendors' },
  { value: 'mobilizers', label: 'Mobilizers' },
];

export default function ViewTabs() {
  const { roles } = useAuthContext();
  const [value, setValue] = useState('beneficiaries');

  const {
    query: { projectId },
  } = useRouter();

  const { beneficiaries, getBeneficiariesByProject, vendors, getVendorsByProject } = useProjectContext();

  useEffect(() => {
    if (!projectId || value !== 'beneficiaries') return;
    getBeneficiariesByProject(projectId);
  }, [projectId, getBeneficiariesByProject, value]);

  useEffect(() => {
    if (!projectId || value !== 'vendors') return;
    getVendorsByProject(projectId);
  }, [projectId, getVendorsByProject, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {tabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Box>
            <TabPanel value="beneficiaries">
              <TabsTable
                rows={beneficiaries.map((d) => {
                  let { name, ...rest } = d;
                  name = roles.isPalika ? name : name?.substring(0, 1) + 'xxxxxxx Xxxxx';
                  return { name, ...rest };
                })}
                tableHead={BEN_TABLE_HEAD}
              />
            </TabPanel>
            <TabPanel value="vendors">
              {' '}
              <TabsTable rows={vendors} tableHead={VEN_TABLE_HEAD} />
            </TabPanel>
            <TabPanel value="mobilizers">
              {' '}
              <TabsTable rows={mobilizers} tableHead={MOB_TABLE_HEAD} />
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
}
