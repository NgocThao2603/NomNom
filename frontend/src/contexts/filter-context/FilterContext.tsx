import React, { createContext, useContext, useState } from 'react';
import { Filter, initFilters } from 'src/services/types';

interface FilterContextProps {
  filters: Filter;
  setFilters: (filters: Filter) => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filter>(initFilters);

  return <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>;
};

export const useFilter = (): FilterContextProps => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
