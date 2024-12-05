import { Box, Typography } from '@mui/material';
import SearchBar from 'src/components/SearchBar/SearchBar.tsx';
import { useState, useEffect } from 'react';
import { Item } from 'src/services/types.ts';
import SortItem from 'src/components/Items/SortItem.tsx';
import { useParams } from 'react-router-dom';
import { getItemByKeyword } from 'src/services/index.tsx';
import { IconSpinLoading } from 'src/assets/icon.tsx';
import { useFilter } from 'src/contexts/filter-context/FilterContext.tsx';

export default function SearchPage() {
  const { keyword } = useParams<{ keyword: string }>();

  const [searchKeyword, setSearchKeyword] = useState(keyword || '');
  const { filters, setFilters } = useFilter();
  const [item, setItem] = useState<Item>({ status: 'idle', data: [] });

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

  return (
    <Box>
      <SearchBar searchKeyword={searchKeyword} filters={filters} setFilters={setFilters} setSearchKeyword={setSearchKeyword} />
      {(item.status == 'fetching' || item.status == 'idle') && <IconSpinLoading sx={{ fontSize: '100px', mt: 10 }} />}
      {item.status == 'failed' && (
        <Typography variant="h6" sx={{ mt: 10, textAlign: 'center' }}>
          No dishes match your search
        </Typography>
      )}
      {item.status == 'success' && <SortItem Item={item.data} />}
    </Box>
  );
}
