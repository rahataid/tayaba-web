import { FIService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  financialInstitutions: [],
  singleFI: {},
  chainData: {},
  refresh: false,
  filter: {},
  wards: [],
  getFIList: () => {},
  getFIById: () => {},
  setChainData: () => {},
  refreshData: () => {},
  setFilter: () => {},
  getAllWards: () => {},
};

const FinancialInstitutionsContext = createContext(initialState);

export const FinancialInstitutionsProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const setFilter = (filter) => setState((prev) => ({ ...prev, filter }));

  const getFIList = useCallback(async () => {
    let filter = state.filter;
    // let filter = state.filter?.name?.length > 3 || state.filter?.phone?.length > 3 ? state.filter : {};

    const response = await FIService.getFIList(filter);

    const formatted = response.data.data.map((item) => ({
      ...item,
      id: item._id,
    }));

    setState((prevState) => ({
      ...prevState,
      financialInstitutions: formatted,
    }));
    return formatted;
  }, [state.filter]);

  const setChainData = useCallback((chainData) => {
    setState((prev) => ({
      ...prev,
      chainData,
    }));
  }, []);

  const getFIById = useCallback(async (id) => {
    const response = await FIService.getFIById(id);

    const formatted = {
      ...response.data,
    };
    setState((prev) => ({
      ...prev,
      singleFI: formatted,
    }));
    return formatted;
  }, []);

  const contextValue = {
    ...state,
    refreshData,
    setFilter,
    setChainData,
    getFIList,
    getFIById,
  };

  return <FinancialInstitutionsContext.Provider value={contextValue}>{children}</FinancialInstitutionsContext.Provider>;
};

FinancialInstitutionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFinancialInstitutionsContext = () => {
  const context = useContext(FinancialInstitutionsContext);
  if (!context) {
    throw new Error('useFinancialInstitutionsContext must be used within a FinancialInstitutionsProvider');
  }
  return context;
};
