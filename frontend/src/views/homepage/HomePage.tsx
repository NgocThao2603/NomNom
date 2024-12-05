import { useState } from 'react';
import { Box } from '@mui/material';
import AllItem from '../../components/Items/AllItem.tsx';
import CategoryFilter from './components/CategoryFilter.tsx';
import SearchBar from 'src/components/SearchBar/SearchBar.tsx';
import { useItems } from 'src/contexts/item-context/ItemContext.tsx';
import { useFilter } from 'src/contexts/filter-context/FilterContext.tsx';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number>();
  const items = useItems();
  const navigate = useNavigate();
  const { filters, setFilters } = useFilter();

  const handleCategoryToggle = (id: number) => {
    navigate('/home/filter');
    setSelectedCategories(id);
    setFilters({ ...filters, categories: [id] });
  };

  return (
    <Box>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      <CategoryFilter onCategoryToggle={handleCategoryToggle} />
      <AllItem Item={items} />
    </Box>
  );
}
