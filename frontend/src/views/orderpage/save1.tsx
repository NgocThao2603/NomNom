import { Box, Button, IconButton, Input, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { categories } from 'src/constants/data';

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
  const [filters, setFilters] = useState<Filter>(initFilters);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [caloriesMin, setCaloriesMin] = useState<string>('');
  const [caloriesMax, setCaloriesMax] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [open, setOpen] = useState(false); // Quản lý trạng thái modal

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
    setFilters(filters);
    console.log('filter:', filters);
    setOpen(false); // Đóng modal sau khi áp dụng filter
  };

  const handleOpenModal = () => {
    setOpen(true); // Mở modal
  };

  const handleCloseModal = () => {
    setOpen(false); // Đóng modal
  };

  return (
    <>
      <IconButton onClick={handleOpenModal}>
        <FilterListIcon sx={{ fontSize: '30px' }} />
      </IconButton>

      <Dialog open={open} onClose={handleCloseModal} maxWidth="xs" fullWidth>
        <DialogTitle>Filter</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApply} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
