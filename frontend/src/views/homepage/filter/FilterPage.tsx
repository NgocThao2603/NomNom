import { Box } from '@mui/material';
import { useState, useMemo } from 'react';
import SortItem from 'src/components/Items/SortItem';
import SearchBar from 'src/components/SearchBar/SearchBar';
import { useFilter } from 'src/contexts/filter-context/FilterContext.tsx';
import { useItems } from 'src/contexts/item-context/ItemContext';
import { Dish } from 'src/services/types';

export default function FilterPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { filters, setFilters } = useFilter();
  const { data: items, status } = useItems();

  const filteredItems = useMemo(() => {
    if (!items || status !== 'success') return [];

    return items.filter((item: Dish) => {
      const matchesCategory = !filters.categories || filters.categories.length === 0 || filters.categories.includes(item.category_id);

      const priceMin = filters.priceRange?.min ? parseFloat(filters.priceRange.min) : undefined;
      const priceMax = filters.priceRange?.max ? parseFloat(filters.priceRange.max) : undefined;
      const matchesPrice = (priceMin === undefined || item.price >= priceMin) && (priceMax === undefined || item.price <= priceMax);

      const caloriesMin = filters.caloriesRange?.min ? parseFloat(filters.caloriesRange.min) : undefined;
      const caloriesMax = filters.caloriesRange?.max ? parseFloat(filters.caloriesRange.max) : undefined;
      const matchesCalories = (caloriesMin === undefined || item.calories >= caloriesMin) && (caloriesMax === undefined || item.calories <= caloriesMax);

      return matchesCategory && matchesPrice && matchesCalories;
    });
  }, [items, filters, status]);

  return (
    <Box>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      <SortItem Item={filteredItems} />
    </Box>
  );
}
