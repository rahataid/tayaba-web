// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}
export function stringifyDestinationRoute(path) {
  return {
    destinationRoute: JSON.stringify({path}),
  }
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_PROJECTS = '/projects';
const ROOT_CASH_TRACKER = '/cash-tracker';
const ROOT_TRANSACTIONS = '/transactions';
const ROOTS_BENEFICIARY = '/beneficiaries';
const ROOTS_VENDORS = '/vendors';
const ROOTS_MOBILIZERS = '/mobilizers';
const ROOTS_FINANCIAL_INSTITUTIONS = '/financial-institutions';
const ROOTS_ADMININSTRATION = '/admin';
const ROOTS_REPORTS = '/reports';
const ROOTS_CONNECT_WALLET = '/connect-wallet';
const ROOTS_AUTH = '/auth';
const ROOTS_APP = '/app';
const ROOTS_PHOTO_GALLERY = '/photo-gallery';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_CONNECT_WALLET = {
  root: ROOTS_CONNECT_WALLET,
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
};

export const PATH_PROJECTS = {
  root: ROOTS_PROJECTS,
  list: path(ROOTS_PROJECTS),
  view: path(ROOTS_PROJECTS, '/[id]'),
  addBudget: path(ROOTS_PROJECTS, '/[id]/add-budget'),
  addProject: path(ROOTS_PROJECTS,'/add'),
};

export const PATH_CASH_TRACKER = {
  root: ROOT_CASH_TRACKER,
  tracker: path(ROOT_CASH_TRACKER, '/tracker'),
};
export const PATH_TRANSACTIONS = {
  root: ROOT_TRANSACTIONS,
  view: (slug) => path(ROOT_TRANSACTIONS, '/' + slug),
};

export const PATH_BENEFICIARY = {
  root: ROOTS_BENEFICIARY,
  list: path(ROOTS_BENEFICIARY),
};

export const PATH_VENDORS = {
  root: ROOTS_VENDORS,
  list: path(ROOTS_VENDORS),
};

export const PATH_MOBILIZERS = {
  root: ROOTS_MOBILIZERS,
  list: path(ROOTS_MOBILIZERS),
};

export const PATH_FINANCIAL_INSTITUTIONS = {
  root: ROOTS_FINANCIAL_INSTITUTIONS,
};

export const PATH_ADMINISTRATION = {
  root: ROOTS_ADMININSTRATION,
  users: path(ROOTS_ADMININSTRATION, '/users'),
  campaigns: path(ROOTS_ADMININSTRATION, '/campaigns'),
};

export const PATH_REPORTS = {
  root: ROOTS_REPORTS,

  villageReport: path(ROOTS_REPORTS, '/village-report'),
};

export const PATH_APP = {
  root: ROOTS_APP,
  settings: path(ROOTS_APP, '/settings'),
};

export const PATH_PHOTO_GALLERY = {
  root: ROOTS_PHOTO_GALLERY,
};
