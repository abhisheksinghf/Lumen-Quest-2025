import React from 'react';
import { Grid, Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Assessment, Devices, People, Storage } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Dummy data for graphs
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Device Usage',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Device Usage Over Time',
      },
    },
  };

  // Card data
  const cardData = [
    { title: 'Total Devices', count: 1523, icon: <Devices />, color: '#1E88E5' },
    { title: 'Total Users', count: 890, icon: <People />, color: '#28A745' },
    { title: 'Storage Capacity', count: '5TB', icon: <Storage />, color: '#FFC107' },
    { title: 'Reports Generated', count: 312, icon: <Assessment />, color: '#FF5722' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Count Cards */}
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, backgroundColor: card.color, color: 'white' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5">{card.title}</Typography>
                <Typography variant="h3">{card.count}</Typography>
              </CardContent>
              <IconButton sx={{ color: 'white' }}>
                {card.icon}
              </IconButton>
            </Card>
          </Grid>
        ))}

        {/* Line Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Device Usage Analytics
              </Typography>
              <Line data={data} options={options} />
            </CardContent>
          </Card>
        </Grid>

        {/* Add more graphs, charts, or components as needed */}
      </Grid>
    </Box>
  );
};

export default Dashboard;
