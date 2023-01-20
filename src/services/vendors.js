import clientApi from '@utils/client';

export const VendorService = {
  getVendorsList(params) {
    return clientApi.get('/vendors', {
      params,
    });
  },

  getVendorById(id) {
    return clientApi.get(`/vendors/${id}`);
  },

  updateVendorApprovalStatus(id, status) {
    return clientApi.put(`/vendors/${id}/approval`, {
      isApproved: status,
    });
  },

  //   getBeneficiariesByProject(projectId) {
  //     return clientApi.get(`/projects/${projectId}/vendors`);
  //   },

  //   getVendorsByProject(projectId) {
  //     return clientApi.get(`/projects/${projectId}/vendors`);
  //   },
};
