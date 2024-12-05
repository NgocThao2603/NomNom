import React from 'react';
import { ThemeCustomProvider } from './theme-context';
import { ModalProvider } from './modal-context/modal-context';
import { ItemProvider } from './item-context/ItemContext';
import { FilterProvider } from './filter-context/FilterContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeCustomProvider>
      <ItemProvider>
        <FilterProvider>
          <ModalProvider>{children}</ModalProvider>
        </FilterProvider>
      </ItemProvider>
    </ThemeCustomProvider>
  );
}
