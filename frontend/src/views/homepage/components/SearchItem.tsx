import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SearchItemProps {
  onSearch: (keyword: string) => void;
}

export default function SearchItem({ onSearch }: SearchItemProps) {
  const location = useLocation();
  const [editKeyword, setEditKeyword] = useState('');

  useEffect(() => {
    if (location.state?.keyword) {
      setEditKeyword(location.state.keyword);
      onSearch(location.state.keyword);
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setEditKeyword(keyword);
    onSearch(keyword);
  };

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        value={editKeyword}
        onChange={handleInputChange}
        placeholder="Search food"
        InputProps={{
          endAdornment: <SearchIcon fontSize="large" />,
        }}
      />
    </Box>
  );
}
