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

  // State for counts and data
  const [userCount, setUserCount] = useState(null);
  const [productCount, setProductCount] = useState(null);
  const [supplierCount, setSupplierCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [ordersData, setOrdersData] = useState([]);
  const [productsData, setProductsData] = useState([]);

  // Fetch data from API endpoints
  const fetchData = async () => {
    try {
      const userResponse = await axios.get('http://localhost:5000/api/users');
      setUserCount(userResponse.data.length);

      const productResponse = await axios.get('http://localhost:5000/api/products');
      setProductCount(productResponse.data.length);
      setProductsData(productResponse.data);

      const supplierResponse = await axios.get('http://localhost:5000/api/suppliers');
      setSupplierCount(supplierResponse.data.length);

      const orderResponse = await axios.get('http://localhost:5000/api/orders');
      setOrderCount(orderResponse.data.length);
      setOrdersData(orderResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // This will run once when the component mounts

  // Process orders data for the monthly chart
  const processOrdersByMonth = (orders) => {
    const orderCountsByMonth = Array(12).fill(0);
    orders.forEach(order => {
      const month = new Date(order.order_date).getMonth(); // getMonth returns 0 for January
      orderCountsByMonth[month]++;
    });
    return orderCountsByMonth;
  };

  // Process products data for the category pie chart
  const processProductsByCategory = (products) => {
    const categoryCounts = {};
    products.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    return categoryCounts;
  };

  const ordersByMonth = processOrdersByMonth(ordersData);
  const productCategories = processProductsByCategory(productsData);

  // Pie chart options for products by category
  const productCategoryChartOptions = {
    chart: {
      type: 'pie',
      height: 280,
    },
    labels: Object.keys(productCategories),
    colors: Object.values(productCategories).map((_, idx) => theme.palette[`${['primary', 'secondary', 'error', 'warning'][idx % 4]}`].main),
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: 'bottom',
    },
  };

  const productCategoryChartSeries = Object.values(productCategories);

  // Bar chart options for orders by month
  const ordersByMonthChartOptions = {
    chart: {
      type: 'bar',
      height: 320,
      toolbar: { show: false },
    },
    colors: [primary],
    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: { show: false },
    xaxis: {
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
    },
    tooltip: { theme: theme.palette.mode === 'dark' ? 'dark' : 'light', fillSeriesColor: false },
  };

  const ordersByMonthChartSeries = [
    { name: 'Orders', data: ordersByMonth },
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
          {/* Orders by Month Section */}
          <Grid item xs={12} sm={6} lg={6}>
            <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: 6 }}>
              <Typography variant="h4" color="textPrimary" fontWeight="bold">Orders by Month</Typography>
              <Chart options={ordersByMonthChartOptions} series={ordersByMonthChartSeries} type="bar" height="320" />
            </Paper>
          </Grid>

          {/* Product Category Pie Chart Section */}
          <Grid item xs={12} sm={6} lg={6}>
            <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: 6 }}>
              <Typography variant="h4" color="textPrimary" fontWeight="bold">Product Categories</Typography>
              <Chart options={productCategoryChartOptions} series={productCategoryChartSeries} type="pie" height="320" />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
