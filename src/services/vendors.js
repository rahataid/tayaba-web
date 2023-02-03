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

  updateVendorApprovalStatus(walletAddress) {
    return clientApi.put(`/vendors/${walletAddress}/approval`, {
      isApproved: true,
    });
  },

};
