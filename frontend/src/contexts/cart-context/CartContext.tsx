import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartContextType {
  totalDishes: number;
  updateTotalDishes: (newTotal: number) => void;
  decrementDishCount: (count: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [totalDishes, setTotalDishes] = useState<number>(0);

  useEffect(() => {
    const storedTotalDishes = localStorage.getItem('totalDishes');
    if (storedTotalDishes) {
      setTotalDishes(parseInt(storedTotalDishes, 10));
    }
  }, []);

  const updateLocalStorage = (newTotal: number) => {
    setTotalDishes(newTotal);
    localStorage.setItem('totalDishes', newTotal.toString());
  };

  const updateTotalDishes = (newTotal: number) => {
    updateLocalStorage(newTotal);
  };

  const decrementDishCount = (count: number) => {
    const currentTotal = parseInt(localStorage.getItem('totalDishes') || '0', 10);
    const newTotal = currentTotal - count >= 0 ? currentTotal - count : 0;
    updateLocalStorage(newTotal);
  };

  return <CartContext.Provider value={{ totalDishes, updateTotalDishes, decrementDishCount }}>{children}</CartContext.Provider>;
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
