import { useTranslation } from 'react-i18next';
import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

interface SearchItemProps {
  searchKeyword: string;
  onSearch: (keyword: string) => void;
}

export default function SearchItem({ onSearch, searchKeyword }: SearchItemProps) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    onSearch(keyword);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/home/${searchKeyword}`);
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        value={searchKeyword}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={t('components.searchBar.searchItem.placeholder')}
        InputProps={{
          endAdornment: <SearchIcon fontSize="large" />,
        }}
      />
    </Box>
  );
}
