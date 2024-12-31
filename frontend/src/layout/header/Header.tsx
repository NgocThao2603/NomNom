import React, { useEffect } from 'react';
import { Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Select, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from 'src/services/index.tsx';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { loggedIn, setLoggedIn } = useAuth(); // Lấy trạng thái đăng nhập từ context
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  useEffect(() => {
    if (!loggedIn) {
      setAnchorEl(null); // Đảm bảo menu đóng khi trạng thái đăng nhập thay đổi
    }
  }, [loggedIn]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement); // Đảm bảo kiểu đúng
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('accessToken');
      document.cookie = 'refreshToken=; Max-Age=0; path=/;';
      setLoggedIn(false);
      navigate('/login');
    } catch (error: any) {
      console.error('Logout failed:', error);
      // Xóa accessToken và điều hướng dù có lỗi
      localStorage.removeItem('accessToken');
      document.cookie = 'refreshToken=; Max-Age=0; path=/;';
      setLoggedIn(false);
      navigate('/login');
    }
  };

  const handleNavigateToFavorites = () => {
    navigate('/favorites');
  };

  return (
    <Box sx={{ py: 2, borderBottom: '1px solid #000' }}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box onClick={() => navigate('/home')} sx={{ cursor: 'pointer' }}>
          <img src="/logo.png" alt="logo" style={{ height: '50px' }} />
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {loggedIn && (
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleNavigateToFavorites}>
              <IconButton>
                <FavoriteIcon sx={{ fontSize: '24px' }} />
              </IconButton>
              {t('layout.header.favorite')}
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <IconButton>{/* <HelpIcon sx={{ fontSize: '24px' }} /> */}</IconButton>
            {t('layout.header.help')}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <LanguageIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            <Select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)} size="small">
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="jp">日本語</MenuItem>
              <MenuItem value="vi">Tiếng Việt</MenuItem>
            </Select>
          </Box>

          {/* Login/Signup or Profile */}
          {!loggedIn ? (
            <Box>
              <Button variant={location.pathname === '/login' ? 'contained' : 'outlined'} sx={{ mr: 0.5 }} onClick={() => navigate('/login')}>
                {t('layout.header.login')}
              </Button>
              <Button variant={location.pathname === '/signup' ? 'contained' : 'outlined'} onClick={() => navigate('/signup')}>
                {t('layout.header.signup')}
              </Button>
            </Box>
          ) : (
            <Box>
              <Avatar sx={{ cursor: 'pointer' }} onClick={handleMenuOpen} />
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => navigate('/settings')}>{t('layout.header.settings')}</MenuItem>
                <MenuItem onClick={() => navigate('/order')}>{t('layout.header.orders')}</MenuItem>
                <MenuItem onClick={() => navigate('/order-history')}>{t('layout.header.ordersHistory')}</MenuItem>
                <MenuItem onClick={handleLogout}>{t('layout.header.logout')}</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
