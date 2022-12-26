import client from '@utils/client';

export const MobilizerService = {
  getMobilizersList(params) {
    return client.get('/mobilizers', {
      params,
    });
  },

  getMobilizerById(id) {
    return client.get(`/mobilizers/${id}`);
  },

  //   getBeneficiariesByProject(projectId) {
  //     return client.get(`/projects/${projectId}/mobilizers`);
  //   },

  //   getVendorsByProject(projectId) {
  //     return client.get(`/projects/${projectId}/mobilizers`);
  //   },
};
