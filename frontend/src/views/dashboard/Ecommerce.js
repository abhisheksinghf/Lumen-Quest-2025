import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import Chart from 'react-apexcharts';

// Welcome Component
const Welcome = ({ userName }) => (
  <Box mb={4}>
    <Typography variant="h4" color="textPrimary">Welcome back, {userName}!</Typography>
    <Typography variant="subtitle2" color="textSecondary">Here’s the latest on your Telecom Inventory</Typography>
  </Box>
);

const Dashboard = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;

  // State for counts
  const [userCount, setUserCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [supplierCount, setSupplierCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);

  // Fetch data from API endpoints
  const fetchData = async () => {
    try {
      const userResponse = await axios.get('http://localhost:5000/api/users');
      setUserCount(userResponse.data.length); // Assuming the response is an array of users

      const productResponse = await axios.get('http://localhost:5000/api/users');
      setProductCount(productResponse.data.length); // Assuming the response is an array of products

      const supplierResponse = await axios.get('http://localhost:5000/api/users');
      setSupplierCount(supplierResponse.data.length); // Assuming the response is an array of suppliers

      const orderResponse = await axios.get('http://localhost:5000/api/users');
      setOrderCount(orderResponse.data.length); // Assuming the response is an array of orders
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // This will run once when the component mounts

  // Data for charts
  const expenseChartOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      toolbar: { show: false },
      height: 120,
    },
    labels: ["Profit", "Revenue", "Expense"],
    colors: [primary, error, secondary],
    plotOptions: {
      pie: {
        donut: { size: '70%', background: 'transparent' },
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    legend: { show: false },
    tooltip: { theme: theme.palette.mode === 'dark' ? 'dark' : 'light', fillSeriesColor: false },
  };

  const expenseChartSeries = [60, 25, 15];

  const revenueChartOptions = {
    chart: {
      type: 'bar',
      height: 320,
      stacked: true,
      toolbar: { show: false },
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: { horizontal: false, columnWidth: '20%', borderRadius: [6] },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: { show: false },
    yaxis: { min: -5, max: 5, tickAmount: 4 },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      axisTicks: { show: false },
    },
    tooltip: { theme: theme.palette.mode === 'dark' ? 'dark' : 'light', fillSeriesColor: false },
  };

  const revenueChartSeries = [
    { name: 'Footwear', data: [2.5, 3.7, 3.2, 2.6, 1.9] },
    { name: 'Fashionware', data: [-2.8, -1.1, -3.0, -1.5, -1.9] },
  ];

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Welcome userName="John Doe" />

        <Grid container spacing={4}>
          {/* Count Cards */}
          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{ padding: 5, borderRadius: 3, boxShadow: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: primary }}>
              <Typography variant="h4" color="white" fontWeight="bold">{userCount !== null ? userCount : 'Loading...'}</Typography>
              <Typography variant="subtitle2" color="white">Total Users</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{ padding: 5, borderRadius: 3, boxShadow: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: secondary }}>
              <Typography variant="h4" color="white" fontWeight="bold">{productCount !== null ? productCount : 'Loading...'}</Typography>
              <Typography variant="subtitle2" color="white">Total Products</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{ padding: 5, borderRadius: 3, boxShadow: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a73e8' }}>
              <Typography variant="h4" color="white" fontWeight="bold">{supplierCount !== null ? supplierCount : 'Loading...'}</Typography>
              <Typography variant="subtitle2" color="white">Total Suppliers</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{ padding: 5, borderRadius: 3, boxShadow: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f44336' }}>
              <Typography variant="h4" color="white" fontWeight="bold">{orderCount !== null ? orderCount : 'Loading...'}</Typography>
              <Typography variant="subtitle2" color="white">Total Orders</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Sales Section */}
          <Grid item xs={12} sm={6} lg={6}>
            <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: 6 }}>
              <Typography variant="h4" color="textPrimary" fontWeight="bold">$65,432</Typography>
              <Typography variant="subtitle2" color="textSecondary" mb={2}>Sales</Typography>
              <Box className="rounded-bars">
                <Chart options={revenueChartOptions} series={revenueChartSeries} type="bar" height="90px" />
              </Box>
            </Paper>
          </Grid>

          {/* Expense Section */}
          <Grid item xs={12} sm={6} lg={6}>
            <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: 6 }}>
              <Typography variant="h4" color="textPrimary" fontWeight="bold">$10,230</Typography>
              <Typography variant="subtitle2" color="textSecondary" mb={2}>Expense</Typography>
              <Chart options={expenseChartOptions} series={expenseChartSeries} type="donut" height="120" />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
