import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid from Material-UI
import axios from 'axios';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
  });
  const [rows, setRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch all users when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((response) => {
        const formattedRows = response.data.map((row) => ({
          id: row.user_id, // Required by DataGrid
          ...row,
        }));
        setRows(formattedRows);
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
        .put(`http://localhost:5000/api/users/${editingIndex}`, formData)
        .then((response) => {
          console.log('User updated:', response.data);  // Log updated user data
          const updatedRows = rows.map((row) =>
            row.id === editingIndex ? { ...row, ...formData } : row
          );
          setRows(updatedRows);
          resetForm();
        })
        .catch((error) => console.error('Error updating user:', error));
    } else {
      // Add a new user
      axios
        .post('http://localhost:5000/api/users', formData)
        .then((response) => {
          console.log('User added:', response.data);  // Log new user data
          setRows((prevRows) => [
            ...prevRows,
            { id: response.data.userId, username: formData.username, email: formData.email, role: formData.role },
          ]);
          resetForm();
        })
        .catch((error) => console.error('Error adding user:', error));
    }
  };
  

  const resetForm = () => {
    setEditingIndex(null);
    setFormData({
      username: '',
      password: '',
      email: '',
      role: '',
    });
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
  const handleEdit = (id) => {
    const user = rows.find((row) => row.id === id);
    if (user) {
      setEditingIndex(id);
      setFormData(user);
    }
  };

  // Handle deleting a user
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  // DataGrid columns definition
  const columns = [
    { field: 'username', headerName: 'Username', flex: 1, sortable: true },
    { field: 'email', headerName: 'Email', flex: 1, sortable: true },
    { field: 'role', headerName: 'Role', flex: 1, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

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
            <TextField
              fullWidth
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required={editingIndex === null} // Required only for new users
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
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

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default UserForm;
