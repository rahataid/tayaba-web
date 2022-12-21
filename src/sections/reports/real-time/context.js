import { createContext, useState } from 'react';

const initalState = {};

const Context = createContext(initalState);

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initalState);

  const contextProps = {
    ...state,
  };
  return <Context.Provider value={contextProps}>{children}</Context.Provider>;
};
