// AdsContext.js
import { createContext, useContext } from "react";

const AdsContext = createContext();

export const AdsProvider = ({ children }) => {
  return <AdsContext.Provider value={{}}>{children}</AdsContext.Provider>;
};


