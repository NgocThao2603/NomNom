import { Box, Button, IconButton, Input, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { categories } from 'src/constants/data';
import { useModalContext } from 'src/contexts/modal-context/modal-context.tsx';

type Filter = {
  categories?: number[];
  priceRange?: { min?: string; max?: string };
  caloriesRange?: { min?: string; max?: string };
};

const initFilters: Filter = {
  categories: [],
  priceRange: { min: '', max: '' },
  caloriesRange: { min: '', max: '' },
};

export default function FilterModal() {
  const { openModal, closeModal } = useModalContext();

  const [filters, setFilters] = useState<Filter>(initFilters);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [caloriesMin, setCaloriesMin] = useState<string>('');
  const [caloriesMax, setCaloriesMax] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  useEffect(() => {
    console.log('caloriesMax:', caloriesMax);
  }, [caloriesMax]);

  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  const handleCategoryToggle = (id: number) => {
    const updatedCategories = selectedCategories.includes(id) ? selectedCategories.filter((catId) => catId !== id) : [...selectedCategories, id];

    setSelectedCategories(updatedCategories);
    setFilters((prev) => ({ ...prev, categories: updatedCategories }));
  };

  const handleApply = () => {
    // const filters = {
    //   categories: selectedCategories,
    //   priceRange: { min: priceMin, max: priceMax },
    //   caloriesRange: { min: caloriesMin, max: caloriesMax },
    // };
    setFilters(filters);
    console.log('filter:', filters);
    closeModal();
  };

  const handleOpenModal = () => {
    openModal(
      'Filter',
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
        <Typography sx={{ mt: 2, mb: 1 }}>Calories Range</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Input type="number" placeholder="Min" sx={{ width: '45%' }} value={caloriesMin} onChange={(e) => setCaloriesMin(e.target.value)} />
          -
          <Input type="number" placeholder="Max" sx={{ width: '45%' }} value={caloriesMax} onChange={(e) => setCaloriesMax(e.target.value)} />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>,
      { maxWidth: 'xsm' },
      true
    );
  };

  return (
    <>
      <IconButton onClick={handleOpenModal}>
        <FilterListIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </>
  );
}
