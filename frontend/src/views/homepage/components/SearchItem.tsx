import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface SearchItemProps {
  onSearch: (keyword: string) => void;
}

export default function SearchItem({ onSearch }: SearchItemProps) {
  const [editKeyword, setEditKeyword] = useState('');

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
