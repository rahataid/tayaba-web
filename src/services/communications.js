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

  getSingleCampaign: (id) => api.get(`/campaigns/${id}`),

  getCampaignLogs: (id) => api.get(`/campaigns/${id}/logs`),

  createCampaigns: (data) => api.post('/campaigns', data),

  triggerCampaign: (id) => api.get(`/campaigns/${id}/trigger`),

  getCampaignById: (id) => api.get(`/campaigns/${id}`),

  getTransports: () => api.get('/transports'),

  bulkAddAudiences: (data) => api.post('/audiences/bulk', data),

  getAudiences: () => api.get('/audiences'),
};
