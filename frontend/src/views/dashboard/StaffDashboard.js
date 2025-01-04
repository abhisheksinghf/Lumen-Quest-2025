import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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

  // State for counts and data
  const [productCount, setProductCount] = useState(null);
  const [orderCount, setOrderCount] = useState(null);
  const [stockTransactions, setStockTransactions] = useState([]);

  // Fetch data from API endpoints
  const fetchData = async () => {
    try {
      const productResponse = await axios.get('http://localhost:5000/api/products');
      setProductCount(productResponse.data.length);

      const orderResponse = await axios.get('http://localhost:5000/api/orders');
      setOrderCount(orderResponse.data.length);

      const transactionResponse = await axios.get('http://localhost:5000/api/transactions');
      setStockTransactions(transactionResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // This will run once when the component mounts

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
    { name: 'Orders', data: [10, 20, 15, 30, 25, 35, 40, 45, 50, 60, 55, 70] }, // Dummy data
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
              <Typography variant="h4" color="white" fontWeight="bold">{productCount !== null ? productCount : 'Loading...'}</Typography>
              <Typography variant="subtitle2" color="white">Total Products</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{ padding: 5, borderRadius: 3, boxShadow: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: secondary }}>
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

          {/* Stock In/Out Table Section */}
          <Grid item xs={12} sm={6} lg={6}>
            <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: 6 }}>
              <Typography variant="h4" color="textPrimary" fontWeight="bold">Stock In/Out Transactions</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stockTransactions.length > 0 ? (
                      stockTransactions.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell>{transaction.product}</TableCell>
                          <TableCell>{transaction.type}</TableCell>
                          <TableCell>{transaction.quantity}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">No transactions available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
