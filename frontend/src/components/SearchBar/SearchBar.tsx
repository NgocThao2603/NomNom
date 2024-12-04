import { Box, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchItem from 'src/components/SearchBar/SearchItem';
import { useModalContext } from 'src/contexts/modal-context/modal-context';
import FilterModal from 'src/components/SearchBar/FilterModal';
import { Filter, initFilters } from 'src/services/types';

interface SearchBarProps {
  searchKeyword: string;
  filters: Filter;
  setFilters: (filters: Filter) => void;
  setSearchKeyword: (keyword: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const { setFilters, setSearchKeyword, searchKeyword } = props;
  const { openModal } = useModalContext();

  const handleSearch = (keyword: string) => {
    setFilters(initFilters);
    setSearchKeyword(keyword.toLowerCase());
  };

  function handleOpenModal() {
    setSearchKeyword('');
    openModal('Filter', <FilterModal setFilters={setFilters} />, { maxWidth: 'xsm' }, true);
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
      <IconButton onClick={handleOpenModal}>
        <FilterListIcon sx={{ fontSize: '30px' }} />
      </IconButton>
      <Box sx={{ px: 2, width: '100%' }}>
        <SearchItem searchKeyword={searchKeyword} onSearch={handleSearch} />
      </Box>
      <IconButton aria-label="View shopping cart">
        <ShoppingCartIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </Box>
  );
}
