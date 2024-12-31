export type Dish = {
  id: number;
  dish_name: string;
  price: number;
  average_rating: string;
  calories: number;
  img_url: string;
  category_id: number;
  distance: string;
  res_address: string;
  rating: string | null;
  comment: string | null;
};

export type Item = {
  status: 'idle' | 'success' | 'fetching' | 'failed';
  data: Dish[];
};

export type Filter = {
  categories?: number[];
  priceRange?: { min?: string; max?: string };
  caloriesRange?: { min?: string; max?: string };
};

export const initFilters: Filter = {
  categories: [],
  priceRange: { min: '', max: '' },
  caloriesRange: { min: '', max: '' },
};

export type CartItem = {
  id: number;
  dish_name: string;
  calories: number;
  desrip: string;
  price: number;
  quantity: number;
  img_url: string;
};

export type FavoriteItem = {
  dish_id: number;
  name: string;
  price: number;
  img_url: string;
};

export type Favorite = {
  status: 'idle' | 'success' | 'fetching' | 'failed';
  data: {
    data: FavoriteItem[];
  };
};
export type UserInfo = {
  user_id: number;
  username: string;
  email: string;
  image: string;
  avatar: string;
  address: string;
  phone: string;
};
