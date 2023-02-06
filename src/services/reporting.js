import client from '@utils/client';

// reporting and charts
export const getBeneficiaryCountByGender = () => client.get('/reporting/real-time/beneficiary/count-by-gender');

export const getBeneficiaryCountByGroup = () => client.get('/reporting/beneficiary/count-by-group');

export const getTransactionsCountByMethod = () => client.get('/reporting/transactions/count-by-method');

export const getTransactionsCountByMode = () => client.get('/reporting/transactions/count-by-mode');

export const getTransactionsClaimCountByVillage = () =>
  client.get('/reports/beneficiaries/claim-distribution-by-village');

export const countGenderByWard = () => client.get('/reporting/real-time/beneficiary/count-gender-ward');

export const getBeneficiariesCounts = () => client.get('/reporting/real-time/beneficiary/counts');

export const groupTypeByVillage = (village, type) =>
  client.get('reports/beneficiaries/claim-distribution-by-type', {
    params: {
      village,
      type,
    },
  });

export const groupClaimByWard = (ward) =>
  client.get('/reporting/real-time/beneficiary/group-ward-claim', {
    params: {
      ward,
    },
  });

export const groupWardByLandOwnership = (ward) =>
  client.get('/reporting/real-time/beneficiary/group-ward-land-ownership', {
    params: {
      ward,
    },
  });

export const groupWardByDisability = (ward) =>
  client.get('/reporting/real-time/beneficiary/group-ward-disability', {
    params: {
      ward,
    },
  });

export const groupWardByDailyWage = (ward) =>
  client.get('/reporting/real-time/beneficiary/group-ward-dailywage', {
    params: {
      ward,
    },
  });

export const getMiscValueByName = (name) => client.get(`/misc/${name}`);

export const cashTrackerSummary = () => getMiscValueByName('cash-tracker-summary');

//#region  Demographic

export const getDemographicDataByWard = (data) => client.get('reporting/demographic/ward', { params: data });

export const getBeneficiaryGroupingData = () => client.get('/reporting/end-of-day/beneficiary/grouping-data');

// #endregion
