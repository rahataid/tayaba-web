import clientApi from '@utils/client';

export const BeneficiaryService = {
  getBeneficiariesList(params) {
    return clientApi.get('/beneficiaries', {
      params,
    });
  },

  getBeneficiaryById(id) {
    return clientApi.get(`/beneficiaries/${id}`);
  },

  getAllWards() {
    return clientApi.get('/beneficiaries/wards');
  },

  getBeneficiariesByWard(ward) {
    return clientApi.get(`/beneficiaries/getBeneficiaryByWard`, {
      params: {
        ward,
      },
    });
  },
};
