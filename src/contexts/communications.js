import { CommunicationService } from '@services/communications';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const initialState = {
  campaigns: [],
  getCampaigns: () => {},
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

  const contextValue = useMemo(
    () => ({
      ...state,
      getCampaigns,
    }),
    [state.campaigns]
  );

  return <CommunicationsContext.Provider value={contextValue}>{children}</CommunicationsContext.Provider>;
};

export const useCommunications = () => useContext(CommunicationsContext);
