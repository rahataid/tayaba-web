// routes
import {
  PATH_ADMINISTRATION,
  PATH_BENEFICIARY,
  PATH_DASHBOARD,
  PATH_FINANCIAL_INSTITUTIONS,
  PATH_MOBILIZERS,
  PATH_PROJECTS,
  PATH_REPORTS,
  PATH_VENDORS,
  PATH_CASH_TRACKER,
  PATH_PHOTO_GALLERY,
  PATH_TRANSACTIONS,
  PATH_USERS
} from '@routes/paths';
// components
import Iconify from '@components/iconify';

// ----------------------------------------------------------------------

const icon = (name) => <Iconify icon={name} sx={{ width: 1, height: 1 }} />;
// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  admin: icon('ic:outline-admin-panel-settings'),
  projects: icon('pajamas:project'),
  cashTracker: icon('mdi:cash-clock'),
  transactions: icon('eos-icons:blockchain'),
  beneficiary: icon('mdi:user-convert'),
  dashboard: icon('carbon:dashboard'),
  vendors: icon('material-symbols:anchor'),
  mobilizers: icon('ic:baseline-network-ping'),
  financialInstitution: icon('material-symbols:finance-chip-outline'),
  reports: icon('iconoir:reports'),
  photoGallery: icon('material-symbols:gallery-thumbnail-outline-rounded'),
  users : icon('mdi:user-group-outline'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.root,
        icon: ICONS.dashboard,
      },
      {
        title: 'Projects',
        path: PATH_PROJECTS.root,
        icon: ICONS.projects,
      },
      // {
      //   title: 'Claims',
      //   path: PATH_CASH_TRACKER.root,
      //   icon: ICONS.cashTracker,
      // },
      // {
      //   title: 'Live Transactions',
      //   path: PATH_TRANSACTIONS.root,
      //   icon: ICONS.transactions,
      // },
      {
        title: 'Beneficiary',
        path: PATH_BENEFICIARY.root,
        icon: ICONS.beneficiary,
      },
      {
        title: 'Vendors',
        path: PATH_VENDORS.root,
        icon: ICONS.vendors,
      },
      // {
      //   title: 'Mobilizers',
      //   path: PATH_MOBILIZERS.root,
      //   icon: ICONS.mobilizers,
      // },
      // {
      //   title: 'Financial Institutions',
      //   path: PATH_FINANCIAL_INSTITUTIONS.root,
      //   icon: ICONS.financialInstitution,
      // },
      // {
      //   title: 'Photo Gallery',
      //   path: PATH_PHOTO_GALLERY.root,
      //   icon: ICONS.photoGallery,
      // },

      {
        title: 'Administation',
        path: PATH_ADMINISTRATION.root,
        icon: ICONS.admin,
        children: [
          {
            title: 'Users',
            path: PATH_ADMINISTRATION.users,
          },
        ],
      },
      {
        title: 'Reports',
        path: PATH_REPORTS.root,
        icon: ICONS.reports,
        children: [
          {
            title: 'Demographic',
            path: PATH_REPORTS.demographic,
          },
          {
            title: 'Ward Report',
            path: PATH_REPORTS.wardReport,
          },
        ],
      },

    ],
  },
];

export default navConfig;
