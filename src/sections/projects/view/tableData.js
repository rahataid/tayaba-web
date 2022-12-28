const beneficiaryRows = [
  {
    name: 'Beneficiary 1',
    address: 'Location 1',
    phone: '986262355',
    token: '25',
  },
];

const BEN_TABLE_HEAD = {
  name: {
    id: 'name',
    // id: 'timestamp',
    label: 'Name',
    align: 'left',
  },
  gender: {
    id: 'gender',
    label: 'Gender',
    align: 'left',
  },
  phone: {
    id: 'phone',
    label: 'Phone',
    align: 'left',
  },

  cnicNumber: {
    id: 'cnicNumber',
    label: 'CNIC Number',
    align: 'left',
  },
  phoneOwnedBy: {
    id: 'phoneOwnedBy',
    label: 'Phone Owned By',
    align: 'left',
  },
  hasInternetAccess: {
    id: 'hasInternetAccess',
    label: 'Has Internet Issues',
    align: 'left',
  },
  actions:{
    id:"action",
    label:"Action",
    align:"left"   
  }
};
const vendors = [
  {
    name: 'Beneficiary 1',
    address: 'Location 1',
    phone: '986546515212',
    email: 'email@gmail.com',
    shop: 'TTT',
  },
];

const VEN_TABLE_HEAD = {
  name: {
    id: 'name',
    // id: 'timestamp',
    label: 'Name',
    align: 'left',
  },
  address: {
    id: 'address',
    label: 'Address',
    align: 'left',
  },
  phone: {
    id: 'phone',
    label: 'Phone',
    align: 'left',
  },
  email: {
    id: 'email',
    label: 'Email',
    align: 'left',
  },
  shop: {
    id: 'shop',
    label: 'Shop',
    align: 'left',
  },
};
const mobilizers = [
  {
    name: 'Beneficiary 1',
    address: 'Location 1',
    phone: '98654623623',
    email: 'email2@gmail.com',
  },
];

const MOB_TABLE_HEAD = {
  name: {
    id: 'name',
    // id: 'timestamp',
    label: 'Name',
    align: 'left',
  },
  address: {
    id: 'address',
    label: 'Address',
    align: 'left',
  },
  phone: {
    id: 'phone',
    label: 'Address',
    align: 'left',
  },
  email: {
    id: 'email',
    label: 'Email',
    align: 'left',
  },
};

export { beneficiaryRows, BEN_TABLE_HEAD, vendors, VEN_TABLE_HEAD, mobilizers, MOB_TABLE_HEAD };
