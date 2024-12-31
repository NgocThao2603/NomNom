import { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import AllItem from '../../components/Items/AllItem.tsx';
import CategoryFilter from './components/CategoryFilter.tsx';
import SearchBar from 'src/components/SearchBar/SearchBar.tsx';
import { useItems } from 'src/contexts/item-context/ItemContext.tsx';
import { useFilter } from 'src/contexts/filter-context/FilterContext.tsx';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategories, setSelectedCategories] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Adjust the number of items per page
  const items = useItems();
  const navigate = useNavigate();
  const { filters, setFilters } = useFilter();

  const handleCategoryToggle = (id: number) => {
    navigate('/home/filter');
    setSelectedCategories(id);
    setFilters({ ...filters, categories: [id] });
  };

  // Calculate pagination
  const totalPages = Math.ceil(items.data.length / itemsPerPage);
  const paginatedItems = items.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  console.log(paginatedItems);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      <CategoryFilter onCategoryToggle={handleCategoryToggle} />
      <AllItem Item={{ status: 'success', data: paginatedItems }} />
      <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} />
    </Box>
  );
}
