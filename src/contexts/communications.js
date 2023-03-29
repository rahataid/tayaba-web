import { CommunicationService } from '@services/communications';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const initialState = {
  campaigns: [],
  transports: [],
  getCampaigns: () => {},
  getTransports: () => {},
};

const CommunicationsContext = createContext(initialState);

export const CommunicationsProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getCampaigns = useCallback(async () => {
    const response = await CommunicationService.getCampaigns();

    const formatted = response.data.map((res) => ({
      ...res,
      totalAudiences: res?.audienceIds?.length,
      transportName: res.transport.name,
    }));

    setState((prevState) => ({
      ...prevState,
      campaigns: formatted,
    }));
  }, []);

  const getTransports = useCallback(async () => {
    const response = await CommunicationService.getTransports();

    const formatted = response.data.map((res) => ({
      label: res.name,
      value: res.id,
    }));

    setState((prevState) => ({
      ...prevState,
      transports: formatted,
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      getCampaigns,
      getTransports,
    }),
    [state.campaigns, state.transports]
  );

  return <CommunicationsContext.Provider value={contextValue}>{children}</CommunicationsContext.Provider>;
};

export const useCommunications = () => useContext(CommunicationsContext);
