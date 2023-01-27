import { TransactionService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  transactions: [],
  singleTransaction: {},
  refresh: false,
  getTransactionList: () => {},
};

const TransactionContext = createContext(initialState);

export const TransactionProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const getTransactionList = useCallback(async () => {
    const { data } = await TransactionService.getTransactionList();
    const formatted = data?.data?.map((item) => ({
      ...item,
      //   id: item?.id,
      //   name: item?.name || 'N/A',
      //   gender: item?.gender || 'N/A',
      //   phone: item?.phone || 'N/A',
      //   walletAddress: item?.walletAddress || 'N/A',
      //   contractAddress: item?.contractAddress || 'N/A',
      //   villageId: item?.villageId || 'N/A',
    }));

    setState((prevState) => ({
      ...prevState,
      transactions: {
        data: formatted,
        start: data?.data?.start,
        limit: data?.data?.limit,
        totalPage: data?.data?.totalPage,
      },
    }));
    return formatted;
  }, []);

  const setChainData = useCallback((chainData) => {
    setState((prev) => ({
      ...prev,
      chainData,
    }));
  }, []);

  const contextValue = {
    ...state,
    refreshData,
    setChainData,
    getTransactionList,
  };

  return <TransactionContext.Provider value={contextValue}>{children}</TransactionContext.Provider>;
};

TransactionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionContext must be used within a VendorsContext');
  }
  return context;
};
