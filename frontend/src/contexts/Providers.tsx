import React from 'react';
import { ThemeCustomProvider } from './theme-context';
import { ModalProvider } from './modal-context/modal-context';
import { ItemProvider } from './item-context/ItemContext';
import { FilterProvider } from './filter-context/FilterContext';
import { CartProvider } from './cart-context/CartContext';
import { FavoriteProvider } from './favorite-context/FavoriteContext';
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeCustomProvider>
      <ItemProvider>
        <FilterProvider>
          <ModalProvider>
            <CartProvider>
              <FavoriteProvider>{children}</FavoriteProvider>
            </CartProvider>
          </ModalProvider>
        </FilterProvider>
      </ItemProvider>
    </ThemeCustomProvider>
  );
}
