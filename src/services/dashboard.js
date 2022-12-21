import reportApi, { rahatApi } from '@utils/client';

export const DashboardService = {
  getBeneficiarySummary() {
    return rahatApi.get('/stats/beneficiaries/summary');
  },

  getGeoMapData() {
    return rahatApi.get('/stats/beneficiaries/geo');
  },

  getGenderDistribution() {
    return rahatApi.get('/stats/beneficiaries/gender');
  },

  getBankedUnbanked() {
    return rahatApi.get('/stats/beneficiaries/bank');
  },

  getPhoneOwnership() {
    return rahatApi.get('/stats/beneficiaries/phone');
  },

  getBeneficiariesByWard() {
    return rahatApi.get('/stats/beneficiaries/ward');
  },

  getCashTrackerSummary() {
    return reportApi.get('/misc/cash-tracker-summary');
  },
};
