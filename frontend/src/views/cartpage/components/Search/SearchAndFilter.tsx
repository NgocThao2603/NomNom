import { Box } from '@mui/material';
import FilterItem from './FilterItem';
import SearchItem from './SearchItem';

export default function SearchAndFilter() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
      <FilterItem />
      <Box sx={{ width: '100%' }}>
        <SearchItem />
      </Box>
    </Box>
  );
}
