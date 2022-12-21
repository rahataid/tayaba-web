import clientApi, { rahatApi } from '@utils/client';

export const VendorService = {
  getVendorsList(params) {
    return clientApi.get('/vendors', {
      params,
    });
  },

  getVendorById(id) {
    return rahatApi.get(`/vendors/${id}`);
  },

  //   getBeneficiariesByProject(projectId) {
  //     return rahatApi.get(`/projects/${projectId}/vendors`);
  //   },

  //   getVendorsByProject(projectId) {
  //     return rahatApi.get(`/projects/${projectId}/vendors`);
  //   },
};
