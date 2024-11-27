import { Box, IconButton } from '@mui/material';
import SearchItem from './components/SearchItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AllItem from './components/AllItem.tsx';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.toLowerCase());
  };

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
        <IconButton>
          <FilterListIcon sx={{ fontSize: '30px' }} />
        </IconButton>
        <Box sx={{ px: 2, width: '100%' }}>
          <SearchItem onSearch={handleSearch} />
        </Box>
        <IconButton>
          <ShoppingCartIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>
      <AllItem searchKeyword={searchKeyword} />
    </Box>
  );
}
