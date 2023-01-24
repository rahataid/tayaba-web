import clientApi from '@utils/client';
import qs from 'query-string';

export const ProjectService = {
  getProjectsList(params) {
    return clientApi.get('/projects', {
      params,
    });
  },

  getProjectById(id) {
    return clientApi.get(`/projects/${id}`);
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
    return clientApi.get(`/reports/dashboard/summary`);
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
};
