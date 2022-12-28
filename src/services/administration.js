import clientApi from '@utils/client';

export const AdministrationService  = {
    getUsersList(params) {
        return clientApi.get('/users', {
          params,
        });
      },
    
      getUserById(id) {
        return clientApi.get(`/users/${id}`);
      },
};