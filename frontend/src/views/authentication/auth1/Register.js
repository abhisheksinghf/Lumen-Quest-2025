import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Grid, Box, Typography, Stack, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg'; // Background image import
import Logo from 'src/layouts/full/shared/logo/Logo';

const Register = () => {
  // State to manage form values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Function to handle registration
  const handleRegister = async () => {
    // Skip validation and just redirect to login page
    navigate('/auth/login'); // Redirect to login page directly
  };

  return (
    <PageContainer title="Register" description="this is Register page">
      <Grid container spacing={0} justifyContent="center" sx={{ overflowX: 'hidden' }}>
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
              {/* Retaining the background image */}
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

        {/* Registration Form Section */}
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
            <Typography variant="h4" align="center" gutterBottom>
              Create Your Account
            </Typography>
            
            {/* Registration Form Fields */}
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
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            
            <Box mt={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </Button>
            </Box>

            {/* Sign In Link */}
            <Stack direction="row" spacing={1} mt={3} justifyContent="center">
              <Typography color="textSecondary" variant="h6" fontWeight="400">
                Already have an account?
              </Typography>
              <Typography
                component={Link}
                to="/auth/login"
                fontWeight="500"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                }}
              >
                Sign In
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Register;
