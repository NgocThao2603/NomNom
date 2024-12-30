import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signup } from 'src/services/index.tsx';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signup(email, username, password);
      toast.success('Signup successful! Redirecting to login page...', { position: 'top-right' });
      setTimeout(() => navigate('/login'), 1000);
    } catch (error: any) {
      console.error('Signup failed:', error);
      setErrorMessage(error.message || 'Signup failed. Please try again.');
      toast.error(error.message || 'Signup failed. Please try again.', {
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Grid container sx={{ padding: 2, paddingTop: 7, borderRadius: 2 }}>
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
        <Grid
          item
          xs={12}
          md={5}
          sx={{ paddingLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            SIGN UP
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && (
            <Typography color="error" sx={{ marginTop: 1 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleSignup}
          >
            Signup
          </Button>

          <Typography variant="body2" align="center" sx={{ marginY: 2 }}>
            or login with
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <a
              href="https://accounts.google.com/o/oauth2/auth"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <img
                src="https://static.ce-cdn.net/google/logo_Google_FullColor_xxxhdpi_830x271px.png"
                alt="Google"
                style={{
                  width: '100%',
                  height: '20%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.opacity = '1';
                }}
              />
            </a>
          </Box>

          <Typography variant="body2" align="center" sx={{ marginTop: -10 }}>
            Already have an account?{' '}
            <Typography
              component="span"
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/login')}
            >
              Login
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default SignupPage;
