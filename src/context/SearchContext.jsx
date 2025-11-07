import { createContext, useContext, useState } from "react";

// 1️⃣ Context create
const SearchContext = createContext();

// 2️⃣ Provider component
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// 3️⃣ Custom hook for easy access
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
