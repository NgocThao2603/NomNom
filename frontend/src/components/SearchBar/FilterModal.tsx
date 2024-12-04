import { Box, Button, IconButton, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { categories } from 'src/constants/data';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import { Filter } from '../../views/homepage/HomePage';

interface FilterModalProps {
  setFilters: (filters: Filter) => void;
}

export default function FilterModal({ setFilters }: FilterModalProps) {
  const { closeModal } = useModalContext();

  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [caloriesMin, setCaloriesMin] = useState<string>('');
  const [caloriesMax, setCaloriesMax] = useState<string>('');
  const [priceError, setPriceError] = useState<string>('');
  const [caloriesError, setCaloriesError] = useState<string>('');

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleCategoryToggle = (id: number) => {
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]));
  };

  const handleApply = () => {
    let hasError = false;
    if (parseFloat(priceMin) > parseFloat(priceMax)) {
      setPriceError('Max price should be greater than Min price');
      hasError = true;
    } else {
      setPriceError('');
    }
    if (parseFloat(caloriesMin) > parseFloat(caloriesMax)) {
      setCaloriesError('Max calories should be greater than Min calories');
      hasError = true;
    } else {
      setCaloriesError('');
    }
    if (hasError) return;

    const filters = {
      categories: selectedCategories,
      priceRange: { min: priceMin, max: priceMax },
      caloriesRange: { min: caloriesMin, max: caloriesMax },
    };
    setFilters(filters);
    closeModal();
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ my: 1 }}>By Category</Typography>
      {displayedCategories.map((category) => (
        <Button key={category.id} variant={selectedCategories.includes(category.id) ? 'contained' : 'outlined'} sx={{ mb: 1, mx: 1 }} onClick={() => handleCategoryToggle(category.id)}>
          {category.category}
        </Button>
      ))}
      {!showAll && categories.length > 6 && (
        <Box sx={{ textAlign: 'center' }}>
          <IconButton onClick={handleShowMore}>
            <KeyboardArrowDownIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Box>
      )}
      <Typography sx={{ my: 1 }}>By Price</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Input type="number" placeholder="Min (kVNĐ)" sx={{ width: '45%' }} value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
        -
        <Input type="number" placeholder="Max (kVNĐ)" sx={{ width: '45%' }} value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
      </Box>
      {priceError && (
        <Typography color="error" sx={{ mt: 1 }}>
          {priceError}
        </Typography>
      )}
      <Typography sx={{ mt: 2, mb: 1 }}>Calories Range</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Input type="number" placeholder="Min" sx={{ width: '45%' }} value={caloriesMin} onChange={(e) => setCaloriesMin(e.target.value)} />
        -
        <Input type="number" placeholder="Max" sx={{ width: '45%' }} value={caloriesMax} onChange={(e) => setCaloriesMax(e.target.value)} />
      </Box>
      {caloriesError && (
        <Typography color="error" sx={{ mt: 1 }}>
          {caloriesError}
        </Typography>
      )}
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleApply}>
          Apply
        </Button>
      </Box>
    </Box>
  );
}
