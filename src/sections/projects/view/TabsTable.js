import React from 'react';
import PropTypes from 'prop-types';
import ListTable from '@components/table/ListTable';

const TabsTable = ({
  rows,
  tableHead,
  // tableTitle,
}) => <ListTable tableRowsList={rows} tableHeadersList={tableHead} />;

TabsTable.propTypes = {
  rows: PropTypes.array.isRequired,
  tableHead: PropTypes.object.isRequired,
  // tableTitle: PropTypes.string.isRequired,
};

export default TabsTable;
