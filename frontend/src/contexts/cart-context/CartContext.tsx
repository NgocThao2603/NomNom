import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartContextType {
  totalDishes: number;
  updateTotalDishes: (newTotal: number) => void;
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

  const updateTotalDishes = (newTotal: number) => {
    setTotalDishes(newTotal);
    localStorage.setItem('totalDishes', newTotal.toString());
  };

  return <CartContext.Provider value={{ totalDishes, updateTotalDishes }}>{children}</CartContext.Provider>;
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
