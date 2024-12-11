import { useTranslation } from 'react-i18next';
import { Box, Pagination, Typography } from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import SortItem from 'src/components/Items/SortItem';
import SearchBar from 'src/components/SearchBar/SearchBar';
import { useFilter } from 'src/contexts/filter-context/FilterContext.tsx';
import { useItems } from 'src/contexts/item-context/ItemContext';
import { Dish } from 'src/services/types';

export default function FilterPage() {
  const { t, i18n } = useTranslation();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredItems]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      {paginatedItems.length > 0 ? (
        <>
          <SortItem Item={paginatedItems} />
          <Pagination count={Math.ceil(filteredItems.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          {t('views.homepage.filter.noItem')}
        </Typography>
      )}
    </Box>
  );
}
