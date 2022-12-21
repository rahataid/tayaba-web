import { MobilizerService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  mobilizers: [],
  singleMobilizer: {},

  getMobilizersList: () => {},
  getByMobilizerId: () => {},
};

const MoblizerContext = createContext(initialState);

export const MobilizerProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getMobilizersList = useCallback(async (params) => {
    const response = await MobilizerService.getMobilizersList(params);

    const formatted = response.data.data.map((item) => ({
      ...item,

      id: item?._id,
      registrationDate: item?.created_at,
      registeredBy: `${item?.created_by?.name?.first} ${item?.created_by?.name?.last}`,
    }));

    setState((prevState) => ({
      ...prevState,
      mobilizers: formatted,
    }));
  }, []);

  const getByMobilizerId = useCallback(async (id) => {
    const response = await MobilizerService.getMobilizerById(id);

    const formatted = {
      ...response.data,
      email: response.data?.email || 'N/A',
      registrationDate: response.data?.created_at || 'N/A',
      organization: response.data?.organization || 'N/A',
    };

    setState((prev) => ({
      ...prev,
      singleMobilizer: formatted,
    }));
    return formatted;
  }, []);

  const contextValue = {
    ...state,
    getMobilizersList,
    getByMobilizerId,
  };

  return <MoblizerContext.Provider value={contextValue}>{children}</MoblizerContext.Provider>;
};

MobilizerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMobilizerContext = () => {
  const context = useContext(MoblizerContext);
  if (!context) {
    throw new Error('useMobilizerContext must be used within a MoblizerContext');
  }
  return context;
};
