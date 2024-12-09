import { createContext, useContext, useEffect, useState } from 'react';
import { Item } from 'src/services/types.ts';
import { getAllItem } from 'src/services/index.tsx';

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
      console.error(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return <ItemContext.Provider value={item}>{children}</ItemContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useItems = () => useContext(ItemContext);
