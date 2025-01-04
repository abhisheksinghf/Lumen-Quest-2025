import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import DashboardCard from '../../shared/DashboardCard';

const Sales = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart options for product sales
  const optionsSalesChart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 90,
      width: '100%',
      stacked: true,
      stackType: '100%',
      sparkline: {
        enabled: true,
      },
    },
    colors: [primary, secondary, '#EAEFF4'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: [3],
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'around',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      width: 1,
      colors: ['rgba(0,0,0,0.01)'],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
      x: {
        show: false,
      },
    },
    responsive: [{ breakpoint: 1025, options: { chart: { height: 150, width: 250 } } }],
  };

  // sample sales data for different telecom products
  const seriesSalesChart = [
    {
      color: primary,
      name: 'Devices Sales', // Representing telecom devices sales
      data: [50, 60, 55, 70, 65, 80], // Sample sales data over 6 months
    },
    {
      color: secondary,
      name: 'Accessories Sales', // Representing accessories sales
      data: [35, 45, 40, 50, 55, 60], // Sample sales data over 6 months
    },
    {
      color: '#EAEFF4',
      name: 'Service Plans Sales', // Representing service plans sales
      data: [40, 35, 50, 45, 60, 70], // Sample sales data over 6 months
    },
  ];

  return (
    <DashboardCard>
      <>
        <Typography variant="h4">$65,432</Typography>
        <Typography variant="subtitle2" color="textSecondary" mb={3}>
          Telecom Product Sales
        </Typography>
        <Box className="rounded-bars">
          <Chart options={optionsSalesChart} series={seriesSalesChart} type="bar" height="90px" />
        </Box>
      </>
    </DashboardCard>
  );
};

export default Sales;
