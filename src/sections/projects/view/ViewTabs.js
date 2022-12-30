import { useEffect, useState } from 'react';
import { Box, Tab,Card, CardContent,Pagination } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
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
  const [start,setStart] = useState(0)
  const {
    query: { projectId },
  } = useRouter();

  const { beneficiaries, getBeneficiariesByProject, vendors, getVendorsByProject, getChartData, chartData } = useProjectContext();
  useEffect(() => {
    if (!projectId || value !== 'beneficiaries') return;
    getBeneficiariesByProject({projectId,start});
  }, [projectId, getBeneficiariesByProject, value,start]);

  useEffect(() => {
    if (!projectId || value !== 'vendors') return;
    getVendorsByProject(projectId);
  }, [projectId, getVendorsByProject, value]);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlePagination = (event, page) => {
    let start = (page-1)*beneficiaries.limit
    setStart(start);
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
                rows={beneficiaries?.data?.map((d) => {
                  let { name, ...rest } = d;
                  return { name, ...rest };
                })}
                tableHead={BEN_TABLE_HEAD}
              />
               <Pagination count={beneficiaries?.totalPage} onChange={handlePagination}/>
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
