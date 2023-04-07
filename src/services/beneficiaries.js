import clientApi from '@utils/client';

export const BeneficiaryService = {
  getBeneficiariesList(params) {
    return clientApi.get('/beneficiaries', {
      params,
    });
  },

  assignProject(id, data) {
    return clientApi.patch(`/beneficiaries/project/${id}`, data);
  },

  getBeneficiaryById(id) {
    return clientApi.get(`/beneficiaries/${id}`);
  },

  getAllWards() {
    return clientApi.get('/beneficiaries/wards');
  },

  getAllVillages() {
    return clientApi.get(`/beneficiaries/get-villages`);
  },
  getVillagesList() {
    return clientApi.get(`/villages`);
  },
  getTransactionById(id) {
    return clientApi.get(`/beneficiaries/transaction/${id}`);
  },

  updateUsingWalletAddress(walletAddress, data) {
    return clientApi.patch(`/beneficiaries/wallet-address/${walletAddress}`, data);
  },

  addBeneficiary(payload) {
    return clientApi.post(`/beneficiaries`, payload);
  },
  getProjectsList() {
    return clientApi.get(`/projects`);
  },
};
