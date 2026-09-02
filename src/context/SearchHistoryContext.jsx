import { createContext, useContext, useState } from 'react';

const SearchHistoryContext = createContext();

export function SearchHistoryProvider({ children }) {
  const [searchedJdIds, setSearchedJdIds] = useState([]); // most recent first

  const markSearched = (jdId) => {
    setSearchedJdIds((prev) => [jdId, ...prev.filter((id) => id !== jdId)]);
  };

  const hasSearched = (jdId) => searchedJdIds.includes(jdId);

  return (
    <SearchHistoryContext.Provider
      value={{ searchedJdIds, markSearched, hasSearched }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  return useContext(SearchHistoryContext);
}
