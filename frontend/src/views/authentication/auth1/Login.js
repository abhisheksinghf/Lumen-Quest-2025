import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Box, Stack, Typography, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Add your login validation logic here
    // For this example, we'll just navigate on any login attempt
    if (email && password) {
      navigate('/dashboards/admin');
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
        {/* Background Section */}
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={'calc(100vh - 75px)'}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <img
                src={img1}
                alt="bg"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Login Form Section */}
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box p={4}>
            <Typography variant="h4" fontWeight="600">
              Welcome to Modernize
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={3}>
              Your Admin Dashboard
            </Typography>
            
            {/* Simple Login Form */}
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 3 }}
              >
                Login
              </Button>
            </form>

            {/* Sign up link */}
            <Stack direction="row" spacing={1} mt={3}>
              <Typography color="textSecondary" variant="h6" fontWeight="500">
                New to Modernize?
              </Typography>
              <Typography
                component={Link}
                to="/auth/register"
                fontWeight="500"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                }}
              >
                Create an account
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;
