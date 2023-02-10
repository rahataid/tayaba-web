import client from '@utils/client';

// reporting and charts

export const getTransactionsClaimCountByVillage = () =>
  client.get('/reports/beneficiaries/claim-distribution-by-village');

export const groupTypeByVillage = (village, type) =>
  client.get('reports/beneficiaries/claim-distribution-by-type', {
    params: {
      village,
      type,
    },
  });

export const getMiscValueByName = (name) => client.get(`/misc/${name}`);

export const cashTrackerSummary = () => getMiscValueByName('cash-tracker-summary');

//#region  Demographic

export const getDemographicDataByWard = (data) => client.get('reporting/demographic/ward', { params: data });

export const getBeneficiaryGroupingData = () => client.get('/reporting/end-of-day/beneficiary/grouping-data');

// #endregion
