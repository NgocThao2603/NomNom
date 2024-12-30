import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from 'src/services/index.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate(); // Hook để chuyển hướng trang
  const { loggedIn, setLoggedIn } = useAuth();

  useEffect(() => {
    if (loggedIn) navigate('/home');
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken); // Lưu accessToken vào localStorage
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
      {/* <Box sx={{ height: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}> */}
      <Grid container sx={{ padding: 2, paddingTop: 5, borderRadius: 2 }}>
        {/* Logo */}
        <Grid item xs={12} sx={{ display: 'flex', marginBottom: 2 }}></Grid>

        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
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
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={5} sx={{ paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            LOG IN
          </Typography>
          <TextField fullWidth label="Email" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />

          <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />

          {errorMessage && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {errorMessage}
            </Typography>
          )}

          <Button fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleLogin}>
            Login
          </Button>

          <Typography variant="body2" align="center" sx={{ marginY: 2 }}>
            or login with
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
            Don’t have an account?{' '}
            <Typography component="span" variant="body2" color="primary" sx={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate('/signup')}>
              Sign up
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};

export default LoginPage;
