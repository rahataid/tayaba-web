import client from '@utils/client';

export const AuthService = {
  otpRequest(data) {
    return client.post('/auth/otp', data);
    // return client.post('/users/otp_by_mail', data);
  },
  verifyOtp(data) {
    return client.post('/users/login/otp', data);
    // return client.post('/users/otp_verification', data);
  },
  loginWithWallet(data) {
    return client.post('/users/login/wallet', data);
  },
  signinWalletData(cid) {
    return client.get('/users/walletmessage');
  },
};
