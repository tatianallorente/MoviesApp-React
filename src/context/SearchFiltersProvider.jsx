import { useState } from "react";
import { SearchFiltersContext } from "./SearchFiltersContext";


export const SearchFiltersProvider = ({ children }) => {

  const [searchFilters, setSearchFilters] = useState({});


  return (
    <SearchFiltersContext.Provider value={{ searchFilters, setSearchFilters }}>
      { children }
    </SearchFiltersContext.Provider>
  )
}