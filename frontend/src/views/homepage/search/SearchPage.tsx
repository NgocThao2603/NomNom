import { Box } from '@mui/material';
import SearchBar from 'src/components/SearchBar/SearchBar.tsx';
import { useState, useEffect } from 'react';
import { Filter } from '../HomePage.tsx';
import { Dish, initFilters, Item } from 'src/services/types.ts';
import SortItem from 'src/components/Items/SortItem.tsx';
import { useParams } from 'react-router-dom';
import { getItemByKeyword } from 'src/services/index.tsx';

export default function SearchPage() {
  const { keyword } = useParams<{ keyword: string }>();

  const [searchKeyword, setSearchKeyword] = useState(keyword || '');
  const [filters, setFilters] = useState<Filter>(initFilters);
  const [item, setItem] = useState<Dish[]>([]);

  async function getItem(keyword: string) {
    const response = await getItemByKeyword(keyword);
    setItem(response.data.data);
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
      <SortItem Item={item} />
    </Box>
  );
}
