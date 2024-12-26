import { useTranslation } from 'react-i18next';
import { Box, Button, Container, IconButton, MenuItem, Select, Typography, SelectChangeEvent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // Thay đổi ngôn ngữ
  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value; // Lấy giá trị ngôn ngữ
    i18n.changeLanguage(selectedLanguage); // Thay đổi ngôn ngữ
  };

  const handleNavigateToFavorites = () => {
    navigate('/favorites');
  };

  return (
    <Box sx={{ py: 2, borderBottom: '1px solid #000' }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box onClick={() => navigate('/home')} sx={{ cursor: 'pointer' }}>
          <Typography variant="h4">NomNom</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleNavigateToFavorites}>
              <FavoriteIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            {t('layout.header.favorite')}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <HelpIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            {t('layout.header.help')}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <LanguageIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            <Select
              value={i18n.language} // Giá trị ngôn ngữ hiện tại
              onChange={handleChangeLanguage}
              size="small"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="jp">日本語</MenuItem>
              <MenuItem value="vi">Tiếng Việt</MenuItem>
            </Select>
          </Box>
          <Box>
            <Button variant="contained" sx={{ mr: 0.5 }}>
              {t('layout.header.login')}
            </Button>
            <Button variant="outlined">{t('layout.header.signup')}</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
