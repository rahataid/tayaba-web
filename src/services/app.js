import client from '@utils/client';

export const AppService = {
  getAppSettings() {
    return client.get('/settings');
  },

  getContract(contractName) {
    return client.get(`/misc/contracts/${contractName}`);
  },

  getAdmins() {
    return client.get(`/app/admins`);
  },
};
