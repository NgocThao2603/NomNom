import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from 'src/services/index.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useAuth();

  useEffect(() => {
    if (loggedIn) navigate('/home');
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      setLoggedIn(true);
      toast.success('Login successful!', { position: 'top-right' });
      setTimeout(() => navigate('/home'), 1000);
    } catch (error: any) {
      console.error('Login failed:', error);
      console.log('Error response:', error.response.data);
      setErrorMessage(error.response.data.error || 'Login failed. Please try again.');
      toast.error(error.response.data.error || 'Login failed. Please try again.', {
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Grid container sx={{ padding: 2, paddingTop: 5, borderRadius: 2 }}>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            width: '50vw',
            height: '70vh',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src="https://asianinspirations.com.au/wp-content/uploads/2018/07/Vietnamese-Meal.jpg"
            alt="Delicious Food"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={5} sx={{ paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {t('views.login.title')}
          </Typography>
          <TextField fullWidth label={t('views.login.email')} variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />

          <TextField fullWidth label={t('views.login.password')} type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

          {errorMessage && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {errorMessage}
            </Typography>
          )}

          <Button fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleLogin}>
            {t('views.login.button')}
          </Button>

          <Typography variant="body2" align="center" sx={{ marginY: 2 }}>
            {t('views.login.loginWithGoogle')}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <a href="https://accounts.google.com/o/oauth2/auth" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <img
                src="https://static.ce-cdn.net/google/logo_Google_FullColor_xxxhdpi_830x271px.png"
                alt="Google"
                style={{
                  width: '100%',
                  height: '20%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease, opacity 0.3s ease', // Hiệu ứng hover
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Phóng to ảnh
                  e.currentTarget.style.opacity = '0.8'; // Giảm độ trong suốt
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Trở lại kích thước ban đầu
                  e.currentTarget.style.opacity = '1'; // Khôi phục độ trong suốt
                }}
              />
            </a>
          </Box>
          <Typography variant="body2" align="center" sx={{ marginTop: -10 }}>
            {t('views.login.noAccount')}{' '}
            <Typography component="span" variant="body2" color="primary" sx={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/signup')}>
              {t('views.login.signup')}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
