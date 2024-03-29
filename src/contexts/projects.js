import { ProjectService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useErrorHandler } from '@hooks/useErrorHandler';

const initialState = {
  projects: [],
  singleProject: {},
  beneficiaryCount: 0,
  vendorCount: 0,
  beneficiaries: {},
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
  getProjectsList: () => {},
  getProjectById: () => {},
  getBeneficiariesByProject: () => {},
  getVendorsByProject: () => {},
  refreshData: () => {},
  setRahatResponseStatus: () => {},
  getChartData: () => {},
  getBeneficiariesByvillage: () => {},
  setFilter: () => {},
};

const ProjectsContext = createContext(initialState);

export const ProjectProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));
  const setRahatResponseStatus = (isRahatResponseLive) => setState((prev) => ({ ...prev, isRahatResponseLive }));

  const setFilter = (filter) =>
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
      },
      filter,
    }));

  const getProjectsList = useCallback(async (params) => {
    const response = await ProjectService.getProjectsList(params);
    const formatted = response.data.data.map((item) => ({
      ...item,
      projectManager: item?.project_manager?.name
        ? `${item?.project_manager?.name?.first} ${item?.project_manager?.name?.last}`
        : '-',
      createdAt: item?.created_at,
      balance: item?.budget - item?.disbursed,

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

  const getBeneficiariesByProject = useCallback(
    async (query) => {
      let filterObj = {
        ...query,
      };
      for (const key in state.filter) {
        filterObj[key] = state.filter[key];
      }

      let {
        data: { data },
      } = await ProjectService.getBeneficiariesByProject(filterObj);
      const formatted = data?.data?.map((item) => ({
        ...item,
        id: item?.id,
        registrationDate: item?.created_at,
        hasInternetAccess: item?.hasInternetAccess ? 'Yes' : 'No',
        status: item?.isActivated ? 'Active' : 'Inactive',
      }));

      setState((prevState) => ({
        ...prevState,
        beneficiaries: {
          data: formatted,
          count: data?.count,
          start: data?.start || 0,
          limit: data?.limit || 50,
          totalPage: data?.totalPage,
        },
      }));
    },
    [state.filter]
  );

  const getVendorsByProject = useCallback(async (projectId) => {
    const response = await ProjectService.getVendorsByProject(projectId.toString());

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
      console.log(err);
    }
  });
  const getBeneficiariesByvillage = useCallback(async (params) => {
    try {
      const demographicData = await ProjectService.getBeneficiaryDemographicData(params);
      const chartLabel = demographicData?.data?.data?.beneficiaryPerVillage?.map((d) => d.label);
      const data = demographicData?.data?.data?.beneficiaryPerVillage?.map((d) => d.count);
      const chartData = [
        {
          data,
          name: 'No of Beneficaries',
        },
      ];
      setState((prev) => ({
        ...prev,
        beneficiariesVillageChartData: { chartLabel, chartData },
        beneficiaryCount: demographicData?.data?.data?.totalBeneficiaries || 0,
        vendorCount: demographicData?.data?.data?.totalVendors || 0,
      }));
      return demographicData;
    } catch (err) {
      console.log(err);
    }
  });

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
    setFilter,
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
