import { BeneficiaryService } from '@services/beneficiaries';
import { CommunicationService } from '@services/communications';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const initialState = {
  campaigns: [],
  transports: [],
  audiences: [],
  beneficiaries: [],
  singleCampaign: {},
  campaignLogs: [],
  getCampaigns: () => {},
  getTransports: () => {},
  getAudiences: () => {},
  getBeneficiaries: () => {},
  getSingleCampaign: (id) => console.log('Not implemented'),
  getCampaignLogs: (id) => console.log('Not Implemented'),
};

const CommunicationsContext = createContext(initialState);

export const CommunicationsProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getCampaigns = useCallback(async () => {
    const response = await CommunicationService.getCampaigns();

    const formatted = response.data.map((res) => ({
      ...res,
      totalAudiences: res?.audiences?.length,
      transportName: res.transport.name,
    }));

    setState((prevState) => ({
      ...prevState,
      campaigns: formatted,
    }));
  }, []);

  const getSingleCampaign = useCallback(async (id) => {
    const response = await CommunicationService.getSingleCampaign(id);

    const formatted = {
      ...response.data,
      totalAudiences: response?.data?.audiences?.length,
      transportName: response?.data?.transport?.name,
    };

    setState((prevState) => ({
      ...prevState,
      singleCampaign: formatted,
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

  const getAudiences = useCallback(async () => {
    const response = await CommunicationService.getAudiences();

    const formatted = response.data.map((res) => ({
      label: res?.details?.name || res?.details?.phone,
      value: res.id,
    }));

    setState((prevState) => ({
      ...prevState,
      audiences: formatted,
    }));
  }, []);

  const getBeneficiaries = useCallback(async () => {
    const res = await BeneficiaryService.getBeneficiariesList({
      limit: 200,
    });

    const formatted = res.data?.data?.data.map((ben) => ({
      label: ben.name,
      value: `referenceId:${ben.id}, phone:${ben.phone} `,
    }));

    setState((prev) => ({
      ...prev,
      beneficiaries: formatted,
    }));
    return formatted;
  }, []);

  const getCampaignLogs = useCallback(async (id) => {
    const response = await CommunicationService.getCampaignLogs(id);

    const formatted = response.data.map((res) => ({
      ...res,
      receiver: res?.details?.to || 'N/A',
    }));

    setState((prevState) => ({
      ...prevState,
      campaignLogs: formatted,
    }));
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      getCampaigns,
      getSingleCampaign,
      getTransports,
      getAudiences,
      getBeneficiaries,
      getCampaignLogs,
    }),
    [state.campaigns, state.transports, state.audiences, state.singleCampaign, state.campaignLogs]
  );

  return <CommunicationsContext.Provider value={contextValue}>{children}</CommunicationsContext.Provider>;
};

export const useCommunications = () => useContext(CommunicationsContext);
