import clientApi, { rahatApi } from '@utils/client';

export const BeneficiaryService = {
  getBeneficiariesList(params) {
    return clientApi.get('/beneficiaries', {
      params,
    });
  },

  getBeneficiaryById(id) {
    return rahatApi.get(`/beneficiaries/${id}`);
  },

  getAllWards() {
    return rahatApi.get('/beneficiaries/wards');
  },

  getBeneficiariesByWard(ward) {
    return clientApi.get(`/beneficiaries/getBeneficiaryByWard`, {
      params: {
        ward,
      },
    });
  },
};
