import { BeneficiaryService, ChainCacheService } from '@services';
import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useState } from 'react';

const initialState = {
  beneficiaries: [],
  singleBeneficiary: {},
  transaction: [],
  chainData: {},
  refresh: false,
  filter: {},
  village: [],
  pagination: {
    start: 0,
    limit: 50,
    page: 0,
  },
  projects: [],
  addBeneficiary: () => {},
  getBeneficiariesList: () => {},
  getBeneficiaryByWalletAddress: () => {},
  getTransactionById: () => {},
  setChainData: () => {},
  refreshData: () => {},
  setFilter: () => {},
  setPagination: () => {},
  getAllWards: () => {},
  getAllVillages: () => {},
  resetFilter: () => {},
  getAllProjects: () => {},
  updateUsingWalletAddress: () => {},
  getBeneficiaryById: () => {},
  getBeneficiaryTransactions: () => {},
};

const BeneficiaryContext = createContext(initialState);

export const BeneficiaryProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const setFilter = (filter) =>
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
      },
      filter: {
        ...prev.filter,
        ...filter,
      },
    }));

  const resetFilter = () =>
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        start: 0,
      },
      filter: {},
    }));

  const setPagination = (pagination) => setState((prev) => ({ ...prev, pagination }));

  const getBeneficiariesList = useCallback(async () => {
    let filterObj = {
      limit: state.pagination?.limit,
      start: state.pagination?.start,
    };

    for (const key in state.filter) {
      filterObj[key] = state.filter[key];
    }
    // let filter = state.filter?.name?.length > 3 || state.filter?.phone?.length > 3 ? state.filter : {};

    const response = await BeneficiaryService.getBeneficiariesList(filterObj);
    const formatted = response.data.data?.data?.map((item) => ({
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
        count: response.data?.data.count,
        start: response.data?.data.start,
        limit: response.data?.data.limit,
        totalPage: response.data?.data.totalPage,
      },
    }));
    return formatted;
  }, [state?.filter, state?.pagination, state?.refresh]);

  const setChainData = useCallback((chainData) => {
    setState((prev) => ({
      ...prev,
      ...chainData,
    }));
  }, []);

  const getBeneficiaryByWalletAddress = useCallback(async (walletAddress) => {
    const response = await BeneficiaryService.getBeneficiaryByWalletAddress(walletAddress);
    if (response.data.data === null) {
      setState((prev) => ({
        ...prev,
        singleBeneficiary: null,
      }));
      return null;
    }
    const { name, phone, villageId, gender, bankAccount, dailyDistanceCovered } = response.data.data;
    const formatted = {
      ...response.data,
    };
    setState((prev) => ({
      ...prev,
      singleBeneficiary: formatted,
      editData: { name, phone, villageId, gender, bankAccount, dailyDistanceCovered },
    }));
    return formatted;
  }, []);

  const addBeneficiary = (payload) => BeneficiaryService.addBeneficiary(payload);

  const updateUsingWalletAddress = (walletAddress, data) => BeneficiaryService.updateUsingWalletAddress(walletAddress, data);

  const getAllVillages = useCallback(async () => {
    const response = await BeneficiaryService.getVillagesList();
    const formatted = response?.data?.data?.map((village) => ({
      label: village.name,
      value: village.id,
    }));
    setState((prev) => ({
      ...prev,
      village: formatted,
    }));
    return formatted;
  }, []);

  const getAllProjects = useCallback(async () => {
    const response = await BeneficiaryService.getProjectsList();
    const formatted = response?.data?.data.map((project) => ({
      label: project.name,
      value: project.id,
    }));
    setState((prev) => ({
      ...prev,
      projects: formatted,
    }));
    return formatted;
  }, []);

  const getBeneficiaryTransactions = useCallback(async (contractAddress, benAddress) => {
    const response = await ChainCacheService.listTransactionByBeneficiary(contractAddress, benAddress);
    const formatted = response.map((r) => ({
      ...r,
      amount: r.params.find((param) => param.name === 'amount')?.value,
      event: r?.name,
    }));

    setState((prev) => ({
      ...prev,
      transaction: formatted,
    }));
    return formatted;
  }, []);

  const contextValue = {
    ...state,
    refreshData,
    setFilter,
    setPagination,
    setChainData,
    getBeneficiariesList,
    getBeneficiaryByWalletAddress,
    getAllVillages,
    getBeneficiaryTransactions,
    resetFilter,
    addBeneficiary,
    getAllProjects,
    updateUsingWalletAddress,
  };

  return <BeneficiaryContext.Provider value={contextValue}>{children}</BeneficiaryContext.Provider>;
};

BeneficiaryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBeneficiaryContext = () => {
  const context = useContext(BeneficiaryContext);
  if (!context) {
    throw new Error('useBeneficiaryContext must be used within a BeneficiaryProvider');
  }
  return context;
};
