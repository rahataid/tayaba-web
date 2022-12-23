import clientApi from '@utils/client';

export const ProjectService = {
  getProjectsList(params) {
    return clientApi.get('/projects', {
      params,
    });
  },

  getProjectById(id) {
    return clientApi.get(`/projects/${id}`);
  },

  getBeneficiariesByProject(projectId) {
    return clientApi.get(`/projects/${projectId}/beneficiaries`);
  },

  getVendorsByProject(projectId) {
    return clientApi.get(`/projects/${projectId}/vendors`);
  },
};
