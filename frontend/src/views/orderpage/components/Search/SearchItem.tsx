import { useTranslation } from 'react-i18next';
import { Box, TextField, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchItem() {
  const { t, i18n } = useTranslation();
  const [editKeyword, setEditKeyword] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    if (editKeyword.trim()) {
      navigate(`/home/${encodeURIComponent(editKeyword)}`);
    } else {
      setOpenAlert(true);
    }
  }, [editKeyword, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        value={editKeyword}
        onChange={(e) => setEditKeyword(e.target.value)}
        placeholder="Search food"
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon fontSize="large" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{
            width: '100%',
            backgroundColor: 'red',
            color: 'white',
            boxShadow: 2,
            borderRadius: 1,
          }}
        >
          {t('views.cartpage.components.search.alert')}
        </Alert>
      </Snackbar>
    </Box>
  );
}
