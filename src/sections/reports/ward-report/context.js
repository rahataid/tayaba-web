import { ReportingService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import * as Service from './service';

const initialState = {
  wardChartData: {
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
  dailyWageByWard: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByLandOwnership: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  wardByDisability: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  getTransactionsClaimByVillage: () => {},

  getWardGenderChart: (ward) => {},
  getWardDailyWageChart: (ward) => {},
  getWardLandOwnershipChart: (ward) => {},
  getWardDisabilityChart: (ward) => {},
};

const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getTransactionsClaimByVillage = useCallback(async () => {
    console.log('response');
    const response = await ReportingService.getTransactionsClaimCountByVillage();
    console.log(response);
    const chartLabel = response.data.data.map((d) => d.name);

    const chartData = [
      {
        name: 'Claimed',
        data: response.data.data.map((d) => d.claimed),
      },
      {
        name: 'Not Claimed',
        data: response.data.data.map((d) => d.assigned),
      },
    ];

    setState((prevState) => ({
      ...prevState,
      wardChartData: {
        chartLabel,
        chartData,
      },
    }));
  }, []);

  const getWardGenderChart = useCallback(async (ward) => {
    const response = await Service.groupGenderByWard(ward);
    setState((prevState) => ({
      ...prevState,
      wardByGenderChart: response.data.data,
    }));
  }, []);

  const getWardDailyWageChart = useCallback(async (ward) => {
    const response = await Service.groupWardByDailyWage(ward);
    setState((prevState) => ({
      ...prevState,
      dailyWageByWard: response.data.data,
    }));
  }, []);

  const getWardLandOwnershipChart = useCallback(async (ward) => {
    const response = await Service.groupWardByLandOwnership(ward);
    setState((prevState) => ({
      ...prevState,
      wardByLandOwnership: response.data.data,
    }));
  }, []);
  const getWardDisabilityChart = useCallback(async (ward) => {
    const response = await Service.groupWardByDisability(ward);
    setState((prevState) => ({
      ...prevState,
      wardByDisability: response.data.data,
    }));
  }, []);

  const contextValues = {
    ...state,
    getWardGenderChart,
    getTransactionsClaimByVillage,
    getWardDailyWageChart,
    getWardLandOwnershipChart,
    getWardDisabilityChart,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export const useModuleContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useModuleContext must be used within a ModuleContextProvider');
  }
  return context;
};
