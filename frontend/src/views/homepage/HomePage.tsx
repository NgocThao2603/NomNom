import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import AllItem from '../../components/Items/AllItem.tsx';
import CategoryFilter from './components/CategoryFilter.tsx';
import { Dish, initFilters } from 'src/services/types.ts';
import SearchBar from 'src/components/SearchBar/SearchBar.tsx';
import { getAllItem, getItemByFilters, getItemByKeyword } from 'src/services/index.tsx';

export type Filter = {
  categories?: number[];
  priceRange?: { min?: string; max?: string };
  caloriesRange?: { min?: string; max?: string };
};

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState<Filter>(initFilters);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [item, setItem] = useState<Dish[]>([]);

  const handleCategoryToggle = (id: number) => {
    const updatedCategories = selectedCategories.includes(id) ? selectedCategories.filter((catId) => catId !== id) : [...selectedCategories, id];

    setSelectedCategories(updatedCategories);
    setFilters((prev) => ({ ...prev, categories: updatedCategories }));
  };

  useEffect(() => {
    async function getItems() {
      const response = await getAllItem();
      setItem(response.data);
    }
    getItems();
  }, []);

  return (
    <Box>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      <CategoryFilter selectedCategories={selectedCategories} onCategoryToggle={handleCategoryToggle} />
      <AllItem Item={item} />
    </Box>
  );
}
