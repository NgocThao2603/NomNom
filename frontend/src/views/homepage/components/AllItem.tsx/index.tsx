import { useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import CardItem from './CardItem';
import { Dish, dishes, Restaurant, restaurants } from 'src/constants/data';

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

const updatedDishes = addDistanceToDishes(restaurants, dishes);

type SortOption = 'Low to High' | 'High to Low';
type SelectedFilters = {
  closest: boolean;
  highestRated: boolean;
};

export default function AllItem() {
  const [sortOption, setSortOption] = useState<SortOption>('Low to High');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    closest: false,
    highestRated: false,
  });

  const sortedData = () => {
    let sortedItems = [...updatedDishes];

    if (sortOption === 'Low to High') {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'High to Low') {
      sortedItems.sort((a, b) => b.price - a.price);
    }

    if (selectedFilters.closest) {
      sortedItems.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    }

    if (selectedFilters.highestRated) {
      sortedItems.sort((a, b) => b.average_rating - a.average_rating);
    }

    return sortedItems;
  };

  const handleButtonClick = (filter: keyof SelectedFilters) => {
    setSelectedFilters((prevState) => {
      return { ...prevState, [filter]: !prevState[filter] };
    });
  };

  return (
    <Box>
      <Box sx={{ border: '1px solid #000', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2, py: 1, px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">Sort by</Typography>
          <Select value={sortOption} onChange={(e) => setSortOption(e.target.value as SortOption)} size="small">
            <MenuItem value="Low to High">Price: Low to High</MenuItem>
            <MenuItem value="High to Low">Price: High to Low</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant={selectedFilters.closest ? 'contained' : 'outlined'} onClick={() => handleButtonClick('closest')} sx={{ color: '#000' }}>
            Closest
          </Button>
          <Button variant={selectedFilters.highestRated ? 'contained' : 'outlined'} onClick={() => handleButtonClick('highestRated')} sx={{ color: '#000' }}>
            Highest Rated
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {sortedData().map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <CardItem name={item.dish_name} price={item.price * 1000} img_url={item.img_url} average_rating={item.average_rating} distance={item.distance ? item.distance : 0} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
