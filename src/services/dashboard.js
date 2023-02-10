import client from '@utils/client';
import qs from 'query-string';

export const DashboardService = {
  getBeneficiarySummary() {
    return client.get('/stats/beneficiaries/summary');
  },

  getDemographicsBeneficiarySummary() {
    return client.get('reports/dashboard/summary');
  },

  getGenderDistribution() {
    return client.get('/stats/beneficiaries/gender');
  },

  getBankedUnbanked() {
    return client.get('/stats/beneficiaries/bank');
  },

  getPhoneOwnership() {
    return client.get('/stats/beneficiaries/phone');
  },

  getBeneficiariesByWard() {
    return client.get('/stats/beneficiaries/ward');
  },

  getCashTrackerSummary() {
    return client.get('/misc/cash-tracker-summary');
  },

  getChartData(params, query) {
    return Promise.all(
      params.map(
        (obj) =>
          new Promise((resolve, reject) => {
            client
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
};
