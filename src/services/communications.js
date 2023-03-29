import { COMMUNICATION_API, COMMUNICATION_APP_ID } from '@config';
import axios from 'axios';

const api = axios.create({
  baseURL: COMMUNICATION_API,
  headers: {
    appId: COMMUNICATION_APP_ID,
  },
});

export const CommunicationService = {
  getCampaigns: () => api.get('/campaigns'),

  getTransports: () => api.get('/transports'),
};
