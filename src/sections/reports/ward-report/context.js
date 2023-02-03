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
  villageByGenderChart: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  villageByPhoneType: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  villageByPhoneOwnership: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  villageByInternetAccess: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  getTransactionsClaimByVillage: () => {},

  getVillageGenderChart: (villageId) => {},
  getVillageByPhoneType: (villageId) => {},
  getVillageByPhoneOwnership: (VillageId) => {},
  getVillageByInternetAccess: (villageId) => {},
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

  const getVillageGenderChart = useCallback(async (villageId) => {
    const response = await Service.groupTypeByVillage(villageId, 'gender');
    setState((prevState) => ({
      ...prevState,
      villageByGenderChart: response.data.data,
    }));
  }, []);

  const getVillageByPhoneType = useCallback(async (villageId) => {
    const response = await Service.groupTypeByVillage(villageId, 'phoneType');
    setState((prevState) => ({
      ...prevState,
      villageByPhoneType: response.data.data,
    }));
  }, []);

  const getVillageByPhoneOwnership = useCallback(async (villageId) => {
    const response = await Service.groupTypeByVillage(villageId, 'phoneOwnedBy');
    setState((prevState) => ({
      ...prevState,
      villageByPhoneOwnership: response.data.data,
    }));
  }, []);
  const getVillageByInternetAccess = useCallback(async (villageId) => {
    const response = await Service.groupTypeByVillage(villageId, 'hasInternetAccess');
    setState((prevState) => ({
      ...prevState,
      villageByInternetAccess: response.data.data,
    }));
  }, []);

  const contextValues = {
    ...state,
    getVillageGenderChart,
    getTransactionsClaimByVillage,
    getVillageByPhoneType,
    getVillageByPhoneOwnership,
    getVillageByInternetAccess,
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
