import axios from 'axios';
// import qs from 'query-string';
import { TAYABA_BACKEND } from '@config';

import { getAccessToken } from './sessionManager';

const access_token = getAccessToken();

const api = axios.create({
  //   baseURL: 'https://minimal-assets-api-dev.vercel.app',
  baseURL: TAYABA_BACKEND,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    access_token,

    // report_token: '6E4(WdnI5ukyHDaqy-AKEZvT$7JDnrQG',
  },
  // paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});

api.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || { ...error, message: 'Something went wrong. Please Contact Admin' }
    )
);

export default api;
