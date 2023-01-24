import client from '@utils/client';

export const DashboardService = {
  getBeneficiarySummary() {
    return client.get('/stats/beneficiaries/summary');
  },

  getDemographicsBeneficiarySummary() {
    return client.get('reports/dashboard/summary');
  },

  getGeoMapData() {
    return client.get('/stats/beneficiaries/geo');
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
};
