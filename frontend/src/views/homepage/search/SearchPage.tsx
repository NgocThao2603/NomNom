import { useTranslation } from 'react-i18next';
import { Box, Pagination, Typography } from '@mui/material';
import SearchBar from 'src/components/SearchBar/SearchBar.tsx';
import { useState, useEffect } from 'react';
import { Dish, Filter, initFilters } from 'src/services/types.ts';
import SortItem from 'src/components/Items/SortItem.tsx';
import { useParams } from 'react-router-dom';
import { getItemByKeyword } from 'src/services/index.tsx';

export default function SearchPage() {
  const { t, i18n } = useTranslation();
  const { keyword } = useParams<{ keyword: string }>();

  const [searchKeyword, setSearchKeyword] = useState(keyword || '');
  const [filters, setFilters] = useState<Filter>(initFilters);
  const [item, setItem] = useState<Dish[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  async function getItem(keyword: string) {
    try {
      const response = await getItemByKeyword(keyword);
      if (response.data.success == true) {
        setItem(response.data.data);
      } else if (response.data.success == false) {
        setItem([]);
      }
    } catch (error) {
      setItem([]);
      throw error;
    }
  }

  useEffect(() => {
    if (keyword) {
      setSearchKeyword(keyword);
      getItem(keyword);
    }
  }, [keyword]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = item.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      {paginatedItems.length > 0 ? (
        <>
          <SortItem Item={paginatedItems} />
          <Pagination count={Math.ceil(item.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
        </>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          {t('views.homepage.search.noResult')}
        </Typography>
      )}
    </Box>
  );
}
