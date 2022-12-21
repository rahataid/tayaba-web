import { rahatApi } from '@utils/client';

export const FinancialInstitutionService = {
  getFIList(params) {
    return rahatApi.get('/institutions', {
      params,
    });
  },

  getFIById(id) {
    return rahatApi.get(`/institutions/${id}`);
  },
};
