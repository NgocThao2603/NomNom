import { createContext, useContext, useEffect, useState } from 'react';
import { Dish, Item } from 'src/services/types.ts';
import { getAllItem } from 'src/services/index.tsx';
import { set } from 'date-fns';

const ItemContext = createContext<Item>({ status: 'idle', data: [] });

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [item, setItem] = useState<Item>({ status: 'idle', data: [] });

  async function getItems() {
    try {
      setItem({ status: 'fetching', data: [] });
      const response = await getAllItem();
      setItem({ status: 'success', data: response.data });
    } catch (error) {
      setItem({ status: 'failed', data: [] });
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return <ItemContext.Provider value={item}>{children}</ItemContext.Provider>;
};

export const useItems = () => useContext(ItemContext);
