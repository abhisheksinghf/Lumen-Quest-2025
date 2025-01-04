import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    status: '',
  });
  const [rows, setRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch all users when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (add or update a user)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update an existing user
      axios
        .put(`http://localhost:5000/api/users/${rows[editingIndex].user_id}`, formData)
        .then((response) => {
          const updatedRows = [...rows];
          updatedRows[editingIndex] = response.data;
          setRows(updatedRows);
          setEditingIndex(null);
          setFormData({
            username: '',
            email: '',
            role: '',
            status: '',
          });
        })
        .catch((error) => console.error('Error updating user:', error));
    } else {
      // Add a new user
      axios
        .post('http://localhost:5000/api/users', formData)
        .then((response) => {
          // Ensure the rows are updated with the latest data
          setRows((prevRows) => [...prevRows, response.data]); // Using prevRows to ensure correct state update
          setFormData({
            username: '',
            email: '',
            role: '',
            status: '',
          });
        })
        .catch((error) => console.error('Error adding user:', error));
    }
  };

  // Breadcrumb for navigation
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'User Form',
    },
  ];

  // Handle editing an existing user
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(rows[index]);
  };

  // Handle deleting a user
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() => {
        setRows(rows.filter((row) => row.user_id !== id));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <div style={{ padding: '0px' }}>
      <Breadcrumb title="User Form" items={BCrumb} />

      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="staff">Staff</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {editingIndex !== null ? 'Update User' : 'Add User'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h5" gutterBottom>
        User Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row.user_id}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(row.user_id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserForm;
