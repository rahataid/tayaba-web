import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {};

export const Web3Context = createContext(initialState);

Web3Provider.propTypes = {
  children: PropTypes.node,
};

export function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState(initialState);

  // const _web3Api = useMemo(() => {
  //   return {
  //     ...web3Api,
  //   };
  // }, [web3Api]);

  const _web3Api = {
    ...web3Api,
  };

  return <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>;
}

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
