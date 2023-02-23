// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === 'true' || false;
export const HOST_API = process.env.NEXT_PUBLIC_HOST_API || '';
export const TAYABA_BACKEND = process.env.NEXT_PUBLIC_TAYABA_BACKEND || '';

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Tayaba';

export const WSS_SERVER = TAYABA_BACKEND.replace('http', 'ws');

export const BLOCKCHAIN_EXPLORER = process.env.NEXT_PUBLIC_BLOCKCHAIN_EXPLORER || '';

export const FLICKR_APIKEY = process.env.NEXT_PUBLIC_FLICKR_APIKEY || '';
export const FLICKR_PHOTOSET = process.env.NEXT_PUBLIC_FLICKR_PHOTOSET || '';
export const CHAINCACHE_URL = process.env.NEXT_PUBLIC_CHAINCACHE_URL || '';
export const CHAINCACHE_APPID = process.env.NEXT_PUBLIC_CHAINCACHE_APPID || '';
export const IPFS_GATEWAY = process.env.NEXT_PUBLIC_IPFS_GATEWAY || '';

export const COGNITO_API = {
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
};

export const MAPBOX_API = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const WSS_EVENTS = {
  welcome: 'welcome',
  notification: 'notification',
  rahat_claimed: 'rahat_claimed',
};

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD;

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

export const SPACING = {
  GRID_SPACING: 2,
};

export const ROLES = {
  ADMIN: 'admin',
  DONOR: 'donor',
  MANAGER: 'manager',
  STAKEHOLDER: 'stakeholder',
};

export const CONTRACTS = {
  RAHATTOKEN: 'RahatToken',
  CVAPROJECT: 'CVAProject',
  COMMUNITY: 'RahatCommunity',
  DONOR: 'RahatDonor',
  CLAIM: 'RahatClaim',
};

export const NUMBER_OF_TOKEN_TO_ASSIGN_TO_BENEFICIARY = '1';

export const CHARTDATATYPES = [
  'hasInternetAccess',
  'hasPhone',
  'gender',
  'bankAccountType',
  'isBanked',
  'phoneOwnedBy',
  'simRegisteredUnder',
];
export const TayabaToken = {
  name: 'H2O Wheels',
  symbol: 'H2W',
  decimals: 0,
};

export const NETWORK_GAS_LIMIT = 18000000;
