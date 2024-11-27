import { Box, IconButton } from '@mui/material';
import SearchItem from './components/SearchItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AllItem from './components/AllItem.tsx';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import { useModalContext } from 'src/contexts/modal-context/modal-context.tsx';
import FilterModal from './components/FilterModal.tsx';
import { Dish, dishes, Restaurant, restaurants } from 'src/constants/data.ts';

export type Filter = {
  categories?: number[];
  priceRange?: { min?: string; max?: string };
  caloriesRange?: { min?: string; max?: string };
};

function addDistanceToDishes(restaurants: Restaurant[], dishes: Dish[]): Dish[] {
  const restaurantMap = new Map<number, number>();
  restaurants.forEach((restaurant) => {
    restaurantMap.set(restaurant.id, restaurant.distance);
  });

  return dishes.map((dish) => {
    const distance = restaurantMap.get(dish.restaurant_id);

    return {
      ...dish,
      distance: distance ?? 0,
    };
  });
}

export const updatedDishes = addDistanceToDishes(restaurants, dishes);

export default function HomePage() {
  const { openModal } = useModalContext();

  const initFilters: Filter = {
    categories: [],
    priceRange: { min: '', max: '' },
    caloriesRange: { min: '', max: '' },
  };

  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState<Filter>(initFilters);

  const handleSearch = (keyword: string) => {
    setFilters(initFilters);
    setSearchKeyword(keyword.toLowerCase());
  };

  function handleOpenModal() {
    setSearchKeyword('');
    openModal('Filter', <FilterModal setFilters={setFilters} />, { maxWidth: 'xsm' }, true);
  }

  function filterItems(dishes: Dish[], searchKeyword: string, filters: Filter): Dish[] | undefined {
    const hasFilters =
      searchKeyword ||
      (filters.categories && filters.categories.length > 0) ||
      (filters.priceRange && (filters.priceRange.min || filters.priceRange.max)) ||
      (filters.caloriesRange && (filters.caloriesRange.min || filters.caloriesRange.max));
    if (!hasFilters) {
      return undefined;
    }
    return dishes.filter((dish) => {
      if (searchKeyword && !dish.dish_name.toLowerCase().includes(searchKeyword)) {
        return false;
      }
      if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(dish.category_id)) {
        return false;
      }
      if (filters.priceRange && ((filters.priceRange.min && dish.price < Number(filters.priceRange.min)) || (filters.priceRange.max && dish.price > Number(filters.priceRange.max)))) {
        return false;
      }
      if (
        filters.caloriesRange &&
        ((filters.caloriesRange.min && dish.calories < Number(filters.caloriesRange.min)) || (filters.caloriesRange.max && dish.calories > Number(filters.caloriesRange.max)))
      ) {
        return false;
      }
      return true;
    });
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 3,
        }}
      >
        <IconButton onClick={handleOpenModal}>
          <FilterListIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <Box sx={{ px: 2, width: '100%' }}>
          <SearchItem onSearch={handleSearch} />
        </Box>
        <IconButton>
          <ShoppingCartIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>
      <AllItem Item={filterItems(updatedDishes, searchKeyword, filters)} />
    </Box>
  );
}
