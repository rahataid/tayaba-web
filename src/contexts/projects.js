import { ProjectService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  projects: [],
  singleProject: {},
  beneficiaryCount: 0,
  beneficiaries: [],
  vendors: [],
  chartData: [],
  refresh: false,
  isRahatResponseLive: false,
  error: {},
  beneficiariesVillageChartData: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  getProjectsList: () => { },
  getProjectById: () => { },
  getBeneficiariesByProject: () => { },
  getVendorsByProject: () => { },
  refreshData: () => { },
  setRahatResponseStatus: () => { },
  getChartData: () => { },
  getBeneficiariesByvillage: () => { },
};

const ProjectsContext = createContext(initialState);

export const ProjectProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));
  const setRahatResponseStatus = (isRahatResponseLive) => setState((prev) => ({ ...prev, isRahatResponseLive }));

  const getProjectsList = useCallback(async (params) => {
    const response = await ProjectService.getProjectsList(params);
    const formatted = response.data.data.map((item) => ({
      ...item,
      projectManager: item?.project_manager?.name
        ? `${item?.project_manager?.name?.first} ${item?.project_manager?.name?.last}`
        : '-',
      createdAt: item?.created_at,
      balance: item?.tokenBalance || 0,
      id: item?._id || item?.id,
    }));

    setState((prevState) => ({
      ...prevState,
      projects: formatted,
    }));
    return formatted;
  }, []);

  const getProjectById = useCallback(async (id) => {
    const response = await ProjectService.getProjectById(id);
    const formatted = {
      ...response.data,
      projectManagerName: response.data?.project_manager?.name
        ? `${response.data?.project_manager?.name?.first} ${response.data?.project_manager?.name?.last}`
        : '-',
      projectCreatedAt: response.data?.project_manager?.created_at,
    };

    setState((prev) => ({
      ...prev,
      singleProject: formatted,
    }));
    return formatted;
  }, []);

  const getBeneficiariesByProject = useCallback(async (projectId) => {
    let { data: { data } } = await ProjectService.getBeneficiariesByProject(projectId);
    const formattedData = data.map(el => {
      if (!el.village) el.village = el?.address?.village || '-'
      return el;
    })
    setState((prev) => ({
      ...prev,
      beneficiaries: formattedData || [],
    }));
    return formattedData;
  }, []);

  const getVendorsByProject = useCallback(async (projectId) => {
    const response = await ProjectService.getVendorsByProject(projectId);

    const formatted = response.data.data;

    setState((prev) => ({
      ...prev,
      vendors: formatted,
    }));
    return formatted;
  }, []);

  const getChartData = useCallback(async (params, query) => {
    try {
      const response = await ProjectService.getChartData(params, query);
      setState((prev) => ({
        ...prev,
        chartData: response,
      }));
      return response;
    } catch (err) {
      console.log(err)
    }
  })
  const getBeneficiariesByvillage = useCallback(async (params) => {

    try {
      const { data: demographicData } = await ProjectService.getBeneficiaryDemographicData(params);
      const chartLabel = demographicData?.data?.beneficiaryPerVillage?.map((d) => d.label);
      const data = demographicData?.data?.beneficiaryPerVillage?.map((d) => d.count);
      const chartData = [{
        data,
        name: "No of Beneficaries"
      }]
      setState((prev) => ({
        ...prev,
        beneficiariesVillageChartData: { chartLabel, chartData },
        beneficiaryCount: demographicData?.data?.count || 0
      }));
      return demographicData;
    } catch (err) {
      console.log(err)
    }

  })

  const contextValue = {
    ...state,
    refreshData,
    setRahatResponseStatus,
    getProjectsList,
    getProjectById,
    getBeneficiariesByProject,
    getVendorsByProject,
    getChartData,
    getBeneficiariesByvillage,
  };

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useProjectContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
