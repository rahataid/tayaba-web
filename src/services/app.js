
import client from '@utils/client';

export const AppService = {
  getAppSettings() {
    return client.get('/app/settings');
  },

  getContract(contractName) {
    return client.get(`/app/contracts/${contractName}`);
  },

  getAdmins() {
    return client.get(`/app/admins`);
  },
};
