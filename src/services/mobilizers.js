import { rahatApi } from '@utils/client';

export const MobilizerService = {
  getMobilizersList(params) {
    return rahatApi.get('/mobilizers', {
      params,
    });
  },

  getMobilizerById(id) {
    return rahatApi.get(`/mobilizers/${id}`);
  },

  //   getBeneficiariesByProject(projectId) {
  //     return rahatApi.get(`/projects/${projectId}/mobilizers`);
  //   },

  //   getVendorsByProject(projectId) {
  //     return rahatApi.get(`/projects/${projectId}/mobilizers`);
  //   },
};
