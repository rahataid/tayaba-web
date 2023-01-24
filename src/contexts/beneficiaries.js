import { BeneficiaryService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  beneficiaries: [],
  singleBeneficiary: {},
  chainData: {},
  refresh: false,
  filter: {},
  wards: [],
  pagination: {
    start: 0,
    limit: 50,
    page: 1,
  },
  getBeneficiariesList: () => {},
  getBeneficiaryById: () => {},
  setChainData: () => {},
  refreshData: () => {},
  setFilter: () => {},
  setPagination: () => {},
  getAllWards: () => {},
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
      filter,
    }));

  const setPagination = (pagination) => setState((prev) => ({ ...prev, pagination }));

  const getBeneficiariesList = useCallback(async () => {
    let filterObj = {
      limit: state.pagination?.limit,
      start: state.pagination?.start,
      // page: state.pagination?.page <= 0 ? 1 : state.pagination?.page,
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
      // pagination: {
      //   ...prevState.pagination,
      //   total: response.data.total,
      //   start: response.data.start,
      //   limit: response.data.limit,
      // },
    }));
    return formatted;
  }, [state.filter, state.pagination]);

  const setChainData = useCallback((chainData) => {
    setState((prev) => ({
      ...prev,
      chainData,
    }));
  }, []);

  const getBeneficiaryById = useCallback(async (id) => {
    const response = await BeneficiaryService.getBeneficiaryById(id);

    const formatted = {
      ...response.data,
    };

    setState((prev) => ({
      ...prev,
      singleBeneficiary: formatted,
    }));
    return formatted;
  }, []);

  const getAllWards = useCallback(async () => {
    const response = await BeneficiaryService.getAllWards();
    const formatted = Array(response?.data.data)
      ?.sort((a, b) => a - b)
      .map((item) => ({
        label: item,
        value: item,
      }));
    setState((prev) => ({
      ...prev,
      wards: formatted,
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
    getBeneficiaryById,
    getAllWards,
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
