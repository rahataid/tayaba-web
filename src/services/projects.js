import clientApi, { rahatApi } from '@utils/client';

export const ProjectService = {
  getProjectsList(params) {
    return rahatApi.get('/projects', {
      params,
    });
  },

  getProjectById(id) {
    return rahatApi.get(`/projects/${id}`);
  },

  getBeneficiariesByProject(projectId) {
    return rahatApi.get(`/projects/${projectId}/beneficiaries`);
  },

  getVendorsByProject(projectId) {
    return rahatApi.get(`/projects/${projectId}/vendors`);
  },
};
