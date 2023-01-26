import { ReportingService } from '@services/index';
import { useState, createContext, useContext, useCallback } from 'react';

const initialState = {
  demographicReportData: {
    hasBank: {},
  },
  groupingData: {
    dailyWage: [],
    landOwner: [],
    disability: [],
    phoneOwnership: [],
    hasBank: [],
    hasPhone: [],
  },
  getGroupingData: () => {},
  getDemographicDataByWard: () => {},
};

const ReportsContext = createContext(initialState);

export const ReportsProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getGroupingData = useCallback(async () => {
    const {
      data: { data: groupingData },
    } = await ReportingService.getBeneficiaryGroupingData();
    setState((prevState) => ({
      ...prevState,
      groupingData,
    }));
  }, []);

  const getDemographicDataByWard = useCallback(async (data) => {
    const response = await ReportingService.getDemographicDataByWard(data);
    const chartLabel = response.data.data?.map((d) => `Ward ${d.ward}`);

    let chartData = [];

    switch (data.filterKey) {
      case 'noLand':
        chartData = [
          {
            name: 'Has Land',
            data: response.data.data?.map((d) => d.nonoLand),
          },
          {
            name: 'No Land',
            data: response.data.data?.map((d) => d.noLand),
          },
        ];
        break;

      case 'hasPhone':
        chartData = [
          {
            name: 'Has Phone',
            data: response.data.data?.map((d) => d.hasPhone),
          },
          {
            name: 'No Phone',
            data: response.data.data?.map((d) => d.nohasPhone),
          },
        ];
        break;

      case 'hasBank':
        chartData = [
          {
            name: 'Has Bank',
            data: response.data.data?.map((d) => d.hasBank),
          },
          {
            name: 'No Bank',
            data: response.data.data?.map((d) => d.nohasBank),
          },
        ];
        break;
      case 'dailyWage':
        chartData = [
          {
            name: 'Yes',
            data: response.data.data?.map((d) => d.dailyWage),
          },
          {
            name: 'No',
            data: response.data.data?.map((d) => d.nodailyWage),
          },
        ];
        break;
      case 'disability':
        chartData = [
          {
            name: 'Disabled',
            data: response.data.data?.map((d) => d.disability),
          },
          {
            name: 'Not Disabled',
            data: response.data.data?.map((d) => d.nodisability),
          },
        ];
        break;

      default:
        return null;
    }
    setState((prev) => ({
      ...prev,
      demographicReportData: {
        ...prev.demographicReportData,
        [data.filterKey]: {
          chartLabel,
          chartData,
        },
      },
    }));
  }, []);

  const contextValue = {
    ...state,
    getDemographicDataByWard,
    getGroupingData,
  };

  return <ReportsContext.Provider value={contextValue}>{children}</ReportsContext.Provider>;
};

export const useReportsContext = () => useContext(ReportsContext);
