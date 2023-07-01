import { createContext, useState, useContext } from 'react';

interface ContextProps {
  children: JSX.Element;
}

interface ContextType {}

export const AppContext = createContext<ContextType>({});

export const AppContextProvider: React.FC<ContextProps> = ({ children }) => {
  const contextValue: ContextType = {};

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
