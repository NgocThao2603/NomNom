import { Box, Button, Grid, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import CardItem from '../CartItem/CardItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Dish } from 'src/services/types';
import { useNavigate } from 'react-router-dom';

type SortOption = 'Low to High' | 'High to Low';
type SelectedFilters = {
  closest: boolean;
  highestRated: boolean;
};

export default function SortItem({ Item }: { Item: Dish[] }) {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<SortOption>('Low to High');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    closest: false,
    highestRated: false,
  });

  const sortedData = () => {
    const filteredItems = Item;

    if (sortOption === 'Low to High') {
      filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'High to Low') {
      filteredItems.sort((a, b) => b.price - a.price);
    }

    if (selectedFilters.closest) {
      filteredItems.sort((a, b) => Number(a.distance) - Number(b.distance));
    }

    if (selectedFilters.highestRated) {
      filteredItems.sort((a, b) => Number(b.average_rating) - Number(a.average_rating));
    }

    return filteredItems;
  };

  const handleButtonClick = (filter: keyof SelectedFilters) => {
    setSelectedFilters((prevState) => {
      return { ...prevState, [filter]: !prevState[filter] };
    });
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ mt: 2 }} onClick={() => navigate('/home')}>
          <ArrowBackIcon sx={{ fontSize: 32, cursor: 'pointer' }} />
        </IconButton>
        <Box
          sx={{
            width: '100%',
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
              }}
              size="small"
            >
              <MenuItem value="Low to High">Price: Low to High</MenuItem>
              <MenuItem value="High to Low">Price: High to Low</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant={selectedFilters.closest ? 'contained' : 'outlined'} onClick={() => handleButtonClick('closest')}>
              Closest
            </Button>
            <Button variant={selectedFilters.highestRated ? 'contained' : 'outlined'} onClick={() => handleButtonClick('highestRated')}>
              Highest Rated
            </Button>
          </Box>
        </Box>
      </Box>
      {Item.length === 0 && (
        <Typography variant="h6" sx={{ mt: 10, textAlign: 'center' }}>
          No dishes match your search
        </Typography>
      )}
      <Grid container spacing={2}>
        {sortedData().map((item) => (
          <Grid item xs={6} sm={4} md={2.4} key={item.id}>
            <CardItem name={item.dish_name} price={item.price * 1000} img_url={item.img_url} average_rating={item.average_rating} distance={item.distance} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
