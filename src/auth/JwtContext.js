import { isValid } from 'date-fns';
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
// utils
// import { isValidToken, setSession } from '../utils/jwt';
import {
  isValidToken,
  saveAccessToken,
  getAccessToken,
  deleteAccessToken,
  saveCurrentUser,
  saveKey,
  getCurrentUser,
  getKey,
  clearStorage,
  getWalletAddressFromPrivateKey,
} from '@utils/sessionManager';
import { AppService } from '@services';
import { ROLES, DEBUG_MODE } from '@config';

// ----------------------------------------------------------------------

const initialState = {
  isDebug: DEBUG_MODE,
  isAuthenticated: false, // should be false by default,
  isInitialized: false,
  token: null,
  user: null,
  keyData: null,
  chainUrl: null,
  chainWebSocket: null,
  claimToken: null,
  contracts: null,
  addresses: null,
  wallet: null,
  startBlockNumber: 0,
  roles: {
    isTayaba : false,
    isUser : false,
    isSRSO : false,
  },
  addToken: () => {},
  deleteToken: () => {},
  addUser: () => {},
  addKey: () => {},
  logout: () => {},
};

const AppAuthContext = createContext({
  ...initialState,
  method: 'jwt',
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

const localToken = getAccessToken();
const localUser = getCurrentUser();
const localKey = getKey();
const wallet = getWalletAddressFromPrivateKey();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);

  const getAppSettings = async () => {
    try {
      const response = await AppService.getAppSettings();
      return response.data;
    } catch (err) {
      console.error('Unable to Load App Setting from Server', err);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        if (localToken && isValidToken(localToken)) {
          const appSettings = await getAppSettings();
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: true,
            isInitialized: true,
            token: localToken,
            user: localUser,
            keyData: localKey,
            chainUrl: appSettings?.networkUrl,
            chainWebSocket: appSettings?.chainWebSocket,
            claimToken: {
              ...appSettings?.agency?.token,
              address: appSettings?.agency?.contracts?.rahat_erc20,
              agencyId: appSettings?.agency?.id,
            },
            contracts: appSettings?.agency?.contracts,
            addresses: appSettings?.addresses,
            startBlockNumber: appSettings?.agency?.startBlockNumber,
            wallet,
          }));
        } else if (!localToken) {
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: false,
            isInitialized: true,
          }));
        } else {
          setAuthState((prev) => ({ ...prev, isAuthenticated: false, isInitialized: true }));
        }
      } catch (err) {
        console.error(err);
      }
    };

    initialize();
  }, []);

  const addToken = (payload) => {
    if (payload) {
      setAuthState((prev) => ({ ...prev, token: payload }));
      saveAccessToken(payload);
    }
  };

  const addKey = (payload) => {
    if (payload) {
      setAuthState((prev) => ({ ...prev, keyData: payload }));
      saveKey(payload);
    }
  };

  const addUser = (user) => {
    setAuthState((prev) => ({ ...prev, user }));
    saveCurrentUser(user);
  };

  const deleteToken = () => {
    deleteAccessToken();
    setAuthState((prev) => ({ ...prev, isInitialized: true, token: '' }));
  };

  const logout = () => {
    clearStorage();
    setAuthState((prev) => ({
      ...prev,
      isInitialized: true,
      isAuthenticated: false,
      token: '',
      user: null,
      keyData: null,
    }));
  };

  const roles = useMemo(
    () => ({
      isTayaba: authState.user?.roles?.includes(ROLES.TAYABA) || false,
      isSRSO: authState.user?.roles?.includes(ROLES.SRSO) || false,
      isUser: authState.user?.roles?.includes(ROLES.USER) || false,
      isTayaba: function () {
        return this.isTayaba;
      },
    }),
    [authState.user]
  );

  const contextProps = useMemo(
    () => ({
      ...authState,
      deleteToken,
      addToken,
      addUser,
      addKey,
      logout,
      roles,
    }),
    [authState, roles]
  );

  return <AppAuthContext.Provider value={contextProps}>{children}</AppAuthContext.Provider>;
}

export { AppAuthContext, AuthProvider };

export const useAppAuthContext = () => useContext(AppAuthContext);
