import { rahatApi,clientApi } from '@utils/client';

export const AppService = {
  getAppSettings() {
    return rahatApi.get('/app/settings');
  },

  getContract(contractName) {
    return rahatApi.get(`/app/contracts/${contractName}`);
  },

  getAdmins() {
    return rahatApi.get(`/app/admins`);
  },
};
