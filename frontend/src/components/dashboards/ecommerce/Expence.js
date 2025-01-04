import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

import DashboardCard from '../../shared/DashboardCard';

const Expense = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;

  // chart
  const optionsExpenseChart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      toolbar: {
        show: false,
      },
      height: 120,
    },
    labels: ["Profit", "Revenue", "Expense"],  // Changed to Expense
    colors: [primary, error, secondary],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'transparent'
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };
  const seriesExpenseChart = [60, 25, 15];  // Adjusted to reflect product cost

  return (
    <DashboardCard>
      <>
        <Typography variant="h4">$10,230</Typography>
        <Typography variant="subtitle2" color="textSecondary" mb={2}>
          Total Product Expense
        </Typography>
        <Chart
          options={optionsExpenseChart}
          series={seriesExpenseChart}
          type="donut"
          height="120"
        />
      </>
    </DashboardCard>
  );
};

export default Expense;
