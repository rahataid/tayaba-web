import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import ListTable from '@components/table/ListTable';

const DetailTable = ({ selectedNode, list }) => {
  const TABLE_HEADER = {
    name: {
      id: 'name',
      label: 'Name',
    },
    phone: {
      id: 'phone',
      label: 'Phone',
    },
    // TODO: fix in the backend from DOB
    // age: {
    //   id: 'age',
    //   label: 'Age',
    // },
    gender: {
      id: 'gender',
      label: 'Gender',
    },
    claimed: {
      id: 'claimed',
      label: 'Claimed',
    },
    totalTokenIssued: {
      id: 'totalTokenIssued',
      label: 'Total Token Issued',
    },
    tokenBalance: {
      id: 'tokenBalance',
      label: 'Token Balance',
    },
    cashBalance: {
      id: 'cashBalance',
      label: 'Cash Balance',
    },
  };

  if (!selectedNode)
    return (
      <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100%', p: 2, mt: 3 }}>
        <Typography variant="body3">Please select a node from the tree to view details</Typography>
      </Stack>
    );

  return (
    <Stack
      sx={{
        height: '100%',
        p: 2,
        mt: 3,
      }}
    >
      <ListTable tableRowsList={list} tableHeadersList={TABLE_HEADER} />
    </Stack>
  );
};

DetailTable.propTypes = {
  selectedNode: PropTypes.object,
  list: PropTypes.array,
};

DetailTable.propTypes = {};

export default DetailTable;
