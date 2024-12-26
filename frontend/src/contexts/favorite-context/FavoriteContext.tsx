import { createContext, useContext, useEffect, useState } from 'react';
import { Item } from 'src/services/types.ts';
import { getDishFavorite } from 'src/services/index.tsx';

const FavoriteContext = createContext<Item>({ status: 'idle', data: [] });

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [item, setItem] = useState<Item>({ status: 'idle', data: [] });

  async function getItems() {
    try {
      setItem({ status: 'fetching', data: [] });
      const response = await getDishFavorite('1');
      setItem({ status: 'success', data: response.data });
    } catch (error) {
      setItem({ status: 'failed', data: [] });
      console.error(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return <FavoriteContext.Provider value={item}>{children}</FavoriteContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorite = () => useContext(FavoriteContext);
