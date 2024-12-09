import { Box } from '@mui/material';
import FilterModal from './FilterModal';
import SearchItem from './SearchItem';

export default function SearchAndFilter() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
      <FilterModal />
      <Box sx={{ width: '100%' }}>
        <SearchItem />
      </Box>
    </Box>
  );
}
