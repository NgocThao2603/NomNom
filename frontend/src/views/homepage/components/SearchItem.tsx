import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function SearchItem() {
  const [editKeyword, setEditKeyword] = useState('');

  return (
    <Box>
      <TextField
        // sx={{ borderColor: '#C3C4C3' }}
        fullWidth
        size="small"
        value={editKeyword}
        onChange={(e) => setEditKeyword(e.target.value)}
        placeholder="Search food"
        InputProps={{
          endAdornment: <SearchIcon fontSize="small" />,
        }}
      />
    </Box>
  );
}
