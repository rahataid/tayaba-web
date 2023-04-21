import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

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
};

export const Context = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const contextProps = {
    ...state,
  };

  return <Context.Provider value={contextProps}>{children}</Context.Provider>;
};
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useModuleContext = () => useContext(Context);
