import client from '@utils/client';

export const FinancialInstitutionService = {
  getFIList(params) {
    return client.get('/institutions', {
      params,
    });
  },

  getFIById(id) {
    return client.get(`/institutions/${id}`);
  },
};
