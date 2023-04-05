import clientApi from '@utils/client';
import qs from 'query-string';

export const ProjectService = {
  getProjectsList(params) {
    return clientApi.get('/projects', {
      params,
    });
  },

  getProjectsTypesList(params) {
    return clientApi.get('/projectsTypes', {
      params,
    });
  },

  editProject(id, data) {
    return clientApi.patch(`/projects/update?contractAddress=${id}`, data)
  },

  delete(id) {
    return clientApi.patch(`/projects/${id}/delete`)
  },

  getProjectById(id) {
    return clientApi.get(`/projects/${id}`);
  },

  getProjectByAddress(address) {
    return clientApi.get(`/projects/wallet/${address}`);
  },

  getBeneficiariesByProject(query) {
    return clientApi.get(`/beneficiaries`, {
      params: query,
    });
  },
  getBeneficiariesByVillageCount(projectId) {
    return clientApi.get(`/reports/beneficiary/village/${projectId}`);
  },
  getBeneficiaryDemographicData(projectId) {
    return clientApi.get(`/reports/dashboard/summary`, {
      params: { projectId },
    });
  },

  getVendorsByProject(projectId) {
    return clientApi.get(`/projects/${projectId}/vendors`);
  },
  getChartData(params, query) {
    return Promise.all(
      params.map(
        (obj) =>
          new Promise((resolve, reject) => {
            clientApi
              .get(`/reports/piechart/${obj}?${qs.stringify(query)}`)
              .then(({ data }) => {
                let response = {
                  chart: obj,
                  data: data.data,
                };
                resolve(response);
              })
              .catch((err) => {
                reject(err);
              });
          })
      )
    );
  },
  getTrackerData(name) {
    return clientApi.get(`/misc/${name}`);
  },

  addProject(payload) {
    return clientApi.post('/projects', payload);
  },
};
