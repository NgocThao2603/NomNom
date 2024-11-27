import { Box, Button, Grid, IconButton, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { categories } from 'src/constants/data';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function FilterModal() {
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const displayedCategories = showAll ? categories : categories.slice(0, 6);

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ my: 1 }}>By Category</Typography>
      {displayedCategories.map((category) => (
        <Button key={category.id} variant="outlined" sx={{ mb: 1, mx: 1 }}>
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
        <Input type="number" placeholder="Min (kVNĐ)" sx={{ width: '45%' }} />
        -
        <Input type="number" placeholder="Max (kVNĐ)" sx={{ width: '45%' }} />
      </Box>
      <Typography sx={{ mt: 2, mb: 1 }}>Calories Range</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Input type="number" placeholder="Min" sx={{ width: '45%' }} />
        -
        <Input type="number" placeholder="Max" sx={{ width: '45%' }} />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" sx={{ mt: 3 }}>
          Apply
        </Button>
      </Box>
    </Box>
  );
}
