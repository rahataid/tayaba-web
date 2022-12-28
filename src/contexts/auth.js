import { createContext, useContext, useState } from 'react';
import { useAuthContext } from '../auth/useAuthContext';
import { AuthService } from '@services';

const initialState = {
  otpSent: false,
  handleOtpRequest: () => {},
  handleOtpVerification: () => {},
  setOtpSent: () => {},
  email: '',
};

const LoginContext = createContext(initialState);

export function LoginProvider({ children }) {
  const [state, setState] = useState(initialState);
  const { addToken, addUser, addKey } = useAuthContext();

  const setOtpSent = (otpSent) => {
    if (otpSent) {
      setState((prev) => ({
        ...prev,
        otpSent,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        otpSent: !prev.otpSent,
      }));
    }
  };

  const handleOtpRequest = async (payload) => {
    const response = await AuthService.otpRequest({
      service: 'email',
      serviceId: payload,
    });
    // const response = await AuthService.otpRequest(payload);
    if (response?.data?.success === true) {
      setOtpSent(true);
      setState((prev) => ({
        ...prev,
        email: payload,
      }));
    }
    return response.data;
  };

  const handleOtpVerification = async (payload) => {
    const response = await AuthService.verifyOtp({
      service: 'email',
      serviceId: state.email,
      otp: payload.otp,
    });
    // const response = await AuthService.verifyOtp(payload);
    console.log('response', response);
    if (!response.data) throw new Error('Invalid OTP');
    addToken(response.data?.data.accessToken);
    addUser(response.data?.data.user);
    console.log(
      'permissions',
      response.data?.data.permissions,
      'aceessToken',
      response.data?.data.accessToken,
      'user',
      response.data?.data.user
    );
    // addKey(response.data.key);
    return response.data;
  };

  const contextValue = {
    ...state,
    handleOtpRequest,
    handleOtpVerification,
    setOtpSent,
  };

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
}

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};
