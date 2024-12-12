import { useTranslation } from 'react-i18next';
import { Box, Pagination, Typography } from '@mui/material';
import SearchBar from 'src/components/SearchBar/SearchBar.tsx';
import { useState, useEffect } from 'react';
import { Item } from 'src/services/types.ts';
import SortItem from 'src/components/Items/SortItem.tsx';
import { useParams } from 'react-router-dom';
import { getItemByKeyword } from 'src/services/index.tsx';
import { useFilter } from 'src/contexts/filter-context/FilterContext.tsx';
import { IconSpinLoading } from 'src/assets/icon';

export default function SearchPage() {
  const { t } = useTranslation();
  const { keyword } = useParams<{ keyword: string }>();

  const [searchKeyword, setSearchKeyword] = useState(keyword || '');
  const { filters, setFilters } = useFilter();
  const [item, setItem] = useState<Item>({ status: 'idle', data: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  async function getItem(keyword: string) {
    try {
      setItem({ status: 'fetching', data: [] });
      const response = await getItemByKeyword(keyword);
      if (response.data.success == true) {
        setItem({ status: 'success', data: response.data.data });
      } else if (response.data.success == false) {
        setItem({ status: 'failed', data: [] });
      }
    } catch (error) {
      setItem({ status: 'failed', data: [] });
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
  const paginatedItems = item.data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      {(item.status == 'fetching' || item.status == 'idle') && <IconSpinLoading sx={{ fontSize: '100px', mt: 10 }} />}
      {item.status == 'failed' && (
        <Typography variant="h6" sx={{ mt: 10, textAlign: 'center' }}>
          {t('views.homepage.search.noResult')}
        </Typography>
      )}
      {paginatedItems.length > 0 ? (
        <>
          <SortItem Item={paginatedItems} />
          <Pagination count={Math.ceil(item.data.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}
