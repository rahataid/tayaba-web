import { ProjectService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  projects: [],
  singleProject: {},
  beneficiaries: [],
  vendors: [],
  chartData:[],
  refresh: false,
  isRahatResponseLive: false,
  error: {},
  getProjectsList: () => {},
  getProjectById: () => {},
  getBeneficiariesByProject: () => {},
  getVendorsByProject: () => {},
  refreshData: () => {},
  setRahatResponseStatus: () => {},
  getChartData:()=>{}
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
    const response = await ProjectService.getBeneficiariesByProject(projectId);

    const formatted = response.data.data;

    setState((prev) => ({
      ...prev,
      beneficiaries: formatted,
    }));
    return formatted;
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

  const getChartData = useCallback(async(params,query)=>{
    try{
    const response = await ProjectService.getChartData(params,query);
    console.log(response);
    setState((prev) => ({
      ...prev,
      chartData: response,
    }));
    return response;
  }catch(err){
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
