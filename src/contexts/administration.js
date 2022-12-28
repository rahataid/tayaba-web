import { AdministrationService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  users: [],
  singleUser: {},
  refresh: false,
  isRahatResponseLive: false,
  error: {},
  getUsersList: () => {},
  getUserById: () => {},
  refreshData: () => {},
  setRahatResponseStatus: () => {},
};

const AdministationContext = createContext(initialState);

export const AdministrationProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));
  const setRahatResponseStatus = (isRahatResponseLive) => setState((prev) => ({ ...prev, isRahatResponseLive }));

  const getUsersList = useCallback(async (params) => {
    const response = await AdministrationService.getUsersList(params);
    const formatted = response.data.data.map((item) => ({
      ...item,
      createdAt: item?.created_at,
    //   id: item?._id || item?.id,
    }));

    setState((prevState) => ({
      ...prevState,
      users: formatted,
    }));
    return formatted;
  }, []);

  const getUserById = useCallback(async (id) => {
    const response = await AdministrationService.getUserById(id);

    const formatted = {
      ...response.data,
      projectManagerName: response.data?.project_manager?.name
        ? `${response.data?.project_manager?.name?.first} ${response.data?.project_manager?.name?.last}`
        : '-',
      projectCreatedAt: response.data?.project_manager?.created_at,
    };

    setState((prev) => ({
      ...prev,
      singleUser: formatted,
    }));
    return formatted;
  }, []);


  const contextValue = {
    ...state,
    refreshData,
    setRahatResponseStatus,
    getUsersList,
    getUserById,
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
