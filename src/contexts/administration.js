import { AdministrationService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  users: [],
  singleUser: {},
  refresh: false,
  filter: {},
  isRahatResponseLive: false,
  error: {},
  pagination: {
    start: 0,
    limit: 50,
    count: 0,
  },
  getUsersList: () => {},
  getUserById: () => {},
  refreshData: () => {},
  setFilter: () => {},
  setPagination: () => {},
  setRahatResponseStatus: () => {},
  addUser : () => {},
};

const AdministationContext = createContext(initialState);

export const AdministrationProvider = ({ children }) => {
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

  const setPagination = (pagination) => setState((prev) => ({ ...prev, pagination }));


  const getUsersList = useCallback(async () => {
    let filter = {
      limit: state.pagination?.limit,
      start: state.pagination?.start,
      name: state.filter?.name?.length > 3 ? state.filter?.name : undefined,
    };

    const response = await AdministrationService.getUsersList(filter);
    const formatted = response.data.data.map((item) => ({
      ...item,
      createdAt: item?.created_at,
    }));

    setState((prevState) => ({
      ...prevState,
      users: {
        data: formatted,
        count: response.data?.data.count,
        start: response.data?.data.start,
        limit: response.data?.data.limit,
        totalPage: response.data?.data.totalPage,
      },
    }));
    return formatted;
  }, [state.filter, state.pagination]);

  const getUserById = useCallback(async (id) => {
    const response = await AdministrationService.getUserById(id);

    const formatted = {
      ...response.data,
    };

    setState((prev) => ({
      ...prev,
      singleUser: formatted,
    }));
    return formatted;
  }, []);

  const addUser = useCallback(async(payload) => {
    const user = await AdministrationService.addUser(payload);
    return user;
  }, [])



  const contextValue = {
    ...state,
    refreshData,
    setRahatResponseStatus,
    getUsersList,
    getUserById,
    setFilter,
    setPagination,
    addUser
  };

  return <AdministationContext.Provider value={contextValue}>{children}</AdministationContext.Provider>;
};

AdministrationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAdministrationContext = () => {
  const context = useContext(AdministationContext);
  if (!context) {
    throw new Error('useAdministrationContext must be used within a AdministrationProvider');
  }
  return context;
};
