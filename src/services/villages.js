import clientApi from '@utils/client';

const VillagesService = {
  getVillages: (params) => clientApi.get('/villages', { params }),
  getVillageById: (id) => clientApi.get(`/villages/${id}`),
};

export default VillagesService;
