import { ProjectService } from '@services';
import { fetchApiFormFields, fetchContract, getFolders } from '@services/github';
import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useState } from 'react';

const initialState = {
  projects: [],
  projectsTypesList: [],
  singleProject: {},
  beneficiaryCount: 0,
  vendorCount: 0,
  beneficiaries: {},
  vendors: [],
  chartData: [],
  refresh: false,
  isRahatResponseLive: false,
  error: {},
  editData: {},

  githubProjectTypes: [],
  formFields: [],
  beneficiariesVillageChartData: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  abi: [],
  byteCode: '',
  contractName: '',
  getProjectsList: () => {},
  getProjectById: () => {},
  getProjectByAddress: () => {},
  getBeneficiariesByProject: () => {},
  getVendorsByProject: () => {},
  refreshData: () => {},
  setRahatResponseStatus: () => {},
  getChartData: () => {},
  getBeneficiariesByvillage: () => {},
  setFilter: () => {},
  getProjectsTypesList: () => {},
  getGithubProjectTypes: () => {},
  getFormFields: () => {},
  addProject: () => {},
  getContracts: () => {},
  editProject: () => {},
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
      status: item?.isApproved ? 'Approved' : 'Not Approved',
    }));

    setState((prevState) => ({
      ...prevState,
      projects: formatted,
    }));
    return formatted;
  }, []);

  const getGithubProjectTypes = useCallback(async () => {
    const projectsTypes = await getFolders();
    setState((prev) => ({
      ...prev,
      githubProjectTypes: projectsTypes,
    }));
    return projectsTypes;
  }, []);

  const getFormFields = useCallback(async (projectType) => {
    console.log({ projectType });
    const formFields = await fetchApiFormFields(projectType);
    setState((prev) => ({
      ...prev,
      formFields: formFields,
    }));
    return formFields;
  }, []);

  const getContracts = useCallback(async (projectType) => {
    let { abi, bytecode, contractName } = await fetchContract(projectType);
    setState((prev) => ({
      ...prev,
      abi,
      byteCode: bytecode,
      contractName,
    }));
    return;
  }, []);

  const getProjectById = useCallback(async (id) => {
    const response = await ProjectService.getProjectById(id);
    const { name, location, description, startDate, endDate, extras } = response.data.data;
    const formatted = {
      ...response.data,
      projectManagerName: response.data?.projectManager ? response.data?.projectManager : '-',
      projectCreatedAt: response.data?.project_manager?.created_at,
    };
    setState((prev) => ({
      ...prev,
      singleProject: formatted,
      editData: { name, location, description, startDate, endDate, extras },
    }));
    return formatted;
  }, []);

  const getProjectByAddress = useCallback(async (address) => {
    const response = await ProjectService.getProjectByAddress(address);
    if (response.data.data === null) {
      setState((prev) => ({
        ...prev,
        singleProject: null,
      }));
      return null;
    }
    const { name, location, description, startDate, endDate, extras } = response.data.data;
    const formatted = {
      ...response.data?.data,
      projectManagerName: response.data?.project_manager?.name
        ? `${response.data?.project_manager?.name?.first} ${response.data?.project_manager?.name?.last}`
        : '-',
      projectCreatedAt: response.data?.project_manager?.created_at,
      status: response?.data?.data?.isApproved ? 'Approved' : 'Not Approved',
    };
    console.log('formatted', formatted);

    setState((prev) => ({
      ...prev,
      singleProject: formatted,
      editData: { name, location, description, startDate, endDate, extras },
    }));

    return formatted;
  }, []);

  const addProject = (data) => ProjectService.addProject(data);

  const editProject = (data) => {
    console.log('editProject');
    return ProjectService.editProject(data);
  };

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
  const getProjectsTypesList = useCallback(async () => {
    const { data } = await ProjectService.getProjectsTypesList();
    const formattedData = data.data.map((elem) => ({
      label: elem.name,
      value: elem.id,
    }));
    setState((prev) => ({
      ...prev,
      projectsTypesList: formattedData,
    }));
  }, []);

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
    getProjectsTypesList,
    getGithubProjectTypes,
    getFormFields,
    addProject,
    getContracts,
    getProjectByAddress,
    editProject,
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
