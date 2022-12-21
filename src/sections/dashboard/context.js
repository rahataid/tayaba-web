import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as Service from './service';

const initialState = {
  countByGender: [],
  countByMethod: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  countByMode: [],
  beneficiaryCounts: {
    impacted: {},
    claimed: {},
  },
  dashboardWardChartData: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByGenderChart: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  getBeneficiaryCountByGender: () => {},
  getTransactionsCountByMode: () => {},
  getTransactionsCountByMethod: () => {},
  getBeneficiariesCounts: () => {},
  getTransactionsCountByWard: () => {},
  getWardGenderChart: (ward) => {},
};

export const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getBeneficiaryCountByGender = useCallback(async () => {
    const response = await Service.getBeneficiaryCountByGender();

    const formattedData = response.data.data.map((item) => ({
      label: item.gender,
      value: +item.count,
    }));
    setState((prevState) => ({
      ...prevState,
      countByGender: formattedData,
    }));
  }, []);

  const getTransactionsCountByMethod = useCallback(async () => {
    const response = await Service.getTransactionsCountByMethod();

    setState((prevState) => ({
      ...prevState,
      countByMethod: response.data.data,
    }));
  }, []);

  const getTransactionsCountByMode = useCallback(async () => {
    const response = await Service.getTransactionsCountByMode();
    const formattedData = response.data.data.map((item) => ({
      label: item.isOnline,
      value: +item.count,
    }));
    setState((prevState) => ({
      ...prevState,
      countByMode: formattedData,
    }));
  }, []);

  const getTransactionsCountByWard = useCallback(async (year) => {
    const response = await Service.getTransactionsCountByWard(year);
    setState((prevState) => ({
      ...prevState,
      dashboardWardChartData: response.data.data,
    }));
  }, []);

  const getBeneficiariesCounts = useCallback(async () => {
    const response = await Service.getBeneficiariesCounts();
    setState((prevState) => ({
      ...prevState,
      beneficiaryCounts: response.data.data,
    }));
  }, []);

  const getWardGenderChart = useCallback(async (ward) => {
    const response = await Service.groupGenderByWard(ward);
    setState((prevState) => ({
      ...prevState,
      wardByGenderChart: response.data.data,
    }));
  }, []);

  const contextProps = {
    ...state,
    getBeneficiaryCountByGender,
    getTransactionsCountByMethod,
    getTransactionsCountByMode,
    getTransactionsCountByWard,
    getBeneficiariesCounts,
    getWardGenderChart,
  };

  return <Context.Provider value={contextProps}>{children}</Context.Provider>;
};
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useModuleContext = () => useContext(Context);
