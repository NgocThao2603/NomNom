import { useState } from 'react';
import { Box, Button, Grid, MenuItem, Pagination, Select, Typography } from '@mui/material';
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

type AllItemProps = {
  searchKeyword: string;
};

export default function AllItem({ searchKeyword }: AllItemProps) {
  const [sortOption, setSortOption] = useState<SortOption>('Low to High');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    closest: false,
    highestRated: false,
  });
  const [currentPage, setCurrentPage] = useState(1); // Pagination: Current Page
  const itemsPerPage = 20; // Pagination: Items per page

  const sortedData = () => {
    const filteredItems = updatedDishes.filter((dish) => dish.dish_name.toLowerCase().includes(searchKeyword));

    if (sortOption === 'Low to High') {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'High to Low') {
      filteredItems.sort((a, b) => b.price - a.price);
    }

    if (selectedFilters.closest) {
      filteredItems.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
    }

    if (selectedFilters.highestRated) {
      filteredItems.sort((a, b) => b.average_rating - a.average_rating);
    }

    return filteredItems;
  };

  const paginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData().slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(sortedData().length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleButtonClick = (filter: keyof SelectedFilters) => {
    setSelectedFilters((prevState) => {
      return { ...prevState, [filter]: !prevState[filter] };
    });
    setCurrentPage(1);
  };

  return (
    <Box>
      <Box
        sx={{
          border: '1px solid #000',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 2,
          py: 1,
          px: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">Sort by</Typography>
          <Select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value as SortOption);
              setCurrentPage(1);
            }}
            size="small"
          >
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
        {paginatedData().map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <CardItem name={item.dish_name} price={item.price * 1000} img_url={item.img_url} average_rating={item.average_rating} distance={item.distance ? item.distance : 0} />
          </Grid>
        ))}
      </Grid>

      {/* MUI Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" size="medium" />
      </Box>
    </Box>
  );
}
