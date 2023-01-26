import { DashboardService, ReportingService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  summary: {},
  mapData: [],
  genderDistribution: [],
  demographicSummary: {},
  bankedUnbanked: [],
  phoneOwnership: [],
  chartData: [],
  beneficiariesByWard: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  beneficiariesVillageChartData: {
    chartData: [
      {
        data: [],
        name: '',
      },
    ],
    chartLabel: [],
  },
  cashTrackerSummary: {},
  getSummary: () => {},
  getGeoMapData: () => {},
  getGenderDistribution: () => {},
  getBankedUnbanked: () => {},
  getPhoneOwnership: () => {},
  getChartData: () => {},
  getCashTrackerSummary: () => {},
  getWardGenderChart: () => {},
  getDemographicSummary: () => {},
};

const DashboardContext = createContext(initialState);

export const DashboardProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getSummary = useCallback(async () => {
    const response = await DashboardService.getBeneficiarySummary();
    setState((prev) => ({
      ...prev,
      summary: response.data,
    }));
    return response.data;
  }, []);

  const getGeoMapData = useCallback(async () => {
    const response = await DashboardService.getGeoMapData();
    setState((prev) => ({
      ...prev,
      mapData: response.data,
    }));
    return response.data;
  }, []);

  const getGenderDistribution = useCallback(async () => {
    const response = await DashboardService.getGenderDistribution();
    const formatted = response.data.map((item) => {
      let label = 'Unknown';
      if (item._id === 'F') label = 'Female';
      if (item._id === 'M') label = 'Male';
      if (item._id === 'O') label = 'Other';
      return {
        label,
        value: +item.count,
      };
    });
    setState((prev) => ({
      ...prev,
      genderDistribution: formatted,
    }));
    return response.data;
  }, []);

  const getBankedUnbanked = useCallback(async () => {
    const response = await DashboardService.getBankedUnbanked();
    const formatted = response.data.map((item) => ({
      label: item._id ? 'Banked' : 'Unbanked',
      value: +item.count,
    }));

    setState((prev) => ({
      ...prev,
      bankedUnbanked: formatted,
    }));
    return response.data;
  }, []);

  const getPhoneOwnership = useCallback(async () => {
    const response = await DashboardService.getPhoneOwnership();
    const formatted = response.data.map((item) => ({
      label: item._id ? 'Phone' : 'No Phone',
      value: +item.count,
    }));

    setState((prev) => ({
      ...prev,
      phoneOwnership: formatted,
    }));
    return response.data;
  }, []);

  const getCashTrackerSummary = useCallback(async () => {
    const response = await ReportingService.cashTrackerSummary();
    setState((prev) => ({
      ...prev,
      cashTrackerSummary: response.data.data.value,
    }));
    return response.data;
  }, []);

  const getDemographicSummary = useCallback(async () => {
    const response = await DashboardService.getDemographicsBeneficiarySummary();
    const chartLabel = response?.data?.data?.beneficiaryPerVillage?.map((d) => d.label);
    const data = response?.data?.data?.beneficiaryPerVillage?.map((d) => d.count);
    const chartData = [
      {
        data,
        name: 'No of Beneficaries',
      },
    ];
    setState((prev) => ({
      ...prev,
      demographicSummary: response.data.data,
      beneficiariesVillageChartData: { chartData, chartLabel },
    }));
    return response.data;
  }, []);

  const getChartData = useCallback(async (params, query) => {
    try {
      const response = await DashboardService.getChartData(params, query);
      setState((prev) => ({
        ...prev,
        chartData: response,
      }));
      return response;
    } catch (err) {
      console.log(err);
    }
  });

  const contextValue = {
    ...state,
    getSummary,
    getGeoMapData,
    getGenderDistribution,
    getBankedUnbanked,
    getPhoneOwnership,
    getChartData,
    getCashTrackerSummary,
    getDemographicSummary,
  };

  return <DashboardContext.Provider value={contextValue}>{children}</DashboardContext.Provider>;
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardContext');
  }
  return context;
};
