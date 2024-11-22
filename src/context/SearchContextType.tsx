import React, { createContext, ReactNode, useContext, useState } from "react";
import { useLocation } from "react-router";

interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
  isMainPage: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState("");
  const isMainPage = useLocation().pathname === "/";

  return (
    <SearchContext.Provider value={{ search, setSearch, isMainPage }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
