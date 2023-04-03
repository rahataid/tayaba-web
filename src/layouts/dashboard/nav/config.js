// routes
import {
  PATH_BENEFICIARY,
  PATH_COMMUNICATION,
  PATH_DASHBOARD,
  PATH_PHOTO_GALLERY,
  PATH_PROJECTS,
  PATH_REPORTS,
  PATH_TRANSACTIONS,
  PATH_VENDORS,
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
  communication: icon('carbon:communication-unified'),
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

      {
        title: 'Transactions',
        path: PATH_TRANSACTIONS.root,
        icon: ICONS.transactions,
      },
      {
        title: 'Photo Gallery',
        path: PATH_PHOTO_GALLERY.root,
        icon: ICONS.photoGallery,
      },
      {
        title: 'Beneficiary',
        path: PATH_BENEFICIARY.root,
        icon: ICONS.beneficiary,
      },
      {
        title: 'Communications',
        path: PATH_COMMUNICATION.root,
        icon: ICONS.communication,
        children: [
          {
            title: 'Campaigns',
            path: PATH_COMMUNICATION.campaigns,
          },
        ],
      },
      {
        title: 'Distributors',
        path: PATH_VENDORS.root,
        icon: ICONS.vendors,
      },

      {
        title: 'Reports',
        path: PATH_REPORTS.villageReport,
        icon: ICONS.reports,
        children: [
          {
            title: 'Distribution Point Reports',
            path: PATH_REPORTS.villageReport,
          },
        ],
      },
    ],
  },
];

export default navConfig;
