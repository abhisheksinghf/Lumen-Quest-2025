import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import * as dropdownData from './data';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';

import { IconBellRinging } from '@tabler/icons';
import { Stack } from '@mui/system';
import InventoryIcon from '@mui/icons-material/Inventory';  // Stock icon

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [notifications, setNotifications] = useState([]); // Added state for notifications

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // Fetch the low-stock data and update notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch('http://localhost:5000/api/getlowstock');
      const data = await response.json();

      const formattedNotifications = data.map((product, index) => ({
        avatar: <InventoryIcon />,  // Use stock-related icon
        title: `${product.name} is low on stock`,
        subtitle: `Stock level: ${product.stock_level}`,
      }));

      setNotifications(formattedNotifications);
    };

    fetchNotifications();
  }, []);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(anchorEl2 && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Badge variant="dot" color="primary">
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Stock Alert Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Stack direction="row" py={2} px={4} justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Low Stock Alerts</Typography>
          <Chip label={`${notifications.length} new`} color="primary" size="small" />
        </Stack>
        <Scrollbar sx={{ height: '385px' }}>
          {notifications.map((notification, index) => (
            <Box key={index}>
              <MenuItem sx={{ py: 2, px: 4 }}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      backgroundColor: 'secondary.main',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {notification.avatar} {/* Stock icon */}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '240px',
                      }}
                      noWrap
                    >
                      {notification.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </Box>
          ))}
        </Scrollbar>
        <Box p={3} pb={1}>
          <Button to="/apps/email" variant="outlined" component={Link} color="primary" fullWidth>
            See all Alerts
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Notifications;
