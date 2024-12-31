import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDishFavorite } from 'src/services';

export type FavoriteItem = {
  dish_id: number;
  name: string;
  price: number;
  image: string;
};

export type Favorite = {
  status: 'idle' | 'success' | 'fetching' | 'failed';
  data: {
    data: FavoriteItem[];
  };
};

const FavoriteContext = createContext<Favorite>({
  status: 'idle',
  data: { data: [] },
});

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [item, setItem] = useState<Favorite>({ status: 'idle', data: { data: [] } });

  const getItems = async () => {
    try {
      setItem({
        status: 'fetching',
        data: {
          data: [],
        },
      });

      const response = await getDishFavorite();
      setItem({
        status: 'success',
        data: {
          data: response.data.data,
        },
      });
    } catch (error) {
      console.error('Error fetching favorite items:', error);
      setItem({
        status: 'failed',
        data: {
          data: [],
        },
      });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return <FavoriteContext.Provider value={item}>{children}</FavoriteContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorite = () => useContext(FavoriteContext);
