import { VendorService } from '@services';
import { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/auth/useAuthContext';
import { ethers } from 'ethers';
import { useWallet } from '@hooks/useWallet';

const initialState = {
  vendors: [],
  singleVendor: {},
  chainData: {},
  refresh: false,

  vendorEthBalance: 0,
  getVendorsList: () => {},
  getVendorById: () => {},
  setChainData: () => {},
  refreshData: () => {},
  getVendorEthBalance: () => {},
};

const VendorsContext = createContext(initialState);

export const VendorProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const wallet = useWallet();
  const refreshData = () => setState((prev) => ({ ...prev, refresh: !prev.refresh }));

  const getVendorsList = useCallback(async (params) => {
    const { data } = await VendorService.getVendorsList(params);
    const formatted = data.data?.data?.map((item) => ({
      ...item,
      id: item?.id,
      name: item?.name || 'N/A',
      gender: item?.gender || 'N/A',
      phone: item?.phone || 'N/A',
      walletAddress: item?.walletAddress || 'N/A',
      contractAddress: item?.contractAddress || 'N/A',
      villageId: item?.villageId || 'N/A',
    }));

    setState((prevState) => ({
      ...prevState,
      vendors: {
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

  const getVendorById = useCallback(async (id) => {
    const response = await VendorService.getVendorById(id);

    const formatted = {
      ...response.data.data,
      name: response.data.data?.name || 'N/A',
      gender: response.data?.data?.gender || 'N/A',
      phone: response.data?.data?.phone || 'N/A',
      walletAddress: response.data?.data?.walletAddress || 'N/A',
      contractAddress: response.data?.data?.contractAddress || 'N/A',
      villageId: response.data?.data?.villageId || 'N/A',
    };

    setState((prev) => ({
      ...prev,
      singleVendor: formatted,
    }));
    return formatted;
  }, []);

  const getVendorEthBalance = useCallback(async () => {
    if (!wallet) return;
    if (!state?.singleVendor?.walletAddress) throw new Error('Address is required');
    const balance = await ethers?.utils?.formatEther(
      await wallet?.provider.getBalance(state.singleVendor?.walletAddress)
    );
    setState((prev) => ({
      ...prev,
      vendorEthBalance: balance,
    }));
  }, [state.singleVendor?.walletAddress, wallet]);

  const contextValue = {
    ...state,
    refreshData,
    setChainData,
    getVendorsList,
    getVendorById,
    getVendorEthBalance,
  };

  return <VendorsContext.Provider value={contextValue}>{children}</VendorsContext.Provider>;
};

VendorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useVendorsContext = () => {
  const context = useContext(VendorsContext);
  if (!context) {
    throw new Error('useVendorsContext must be used within a VendorsContext');
  }
  return context;
};
