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

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    status: '',
  });

  const [rows, setRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);  // Error state for handling API errors

  // Fetch all suppliers when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/suppliers')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.error('Error fetching suppliers:', error));
  }, []);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (add or update a supplier)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update an existing supplier
      axios
        .put(`http://localhost:5000/api/suppliers/${rows[editingIndex].supplier_id}`, formData)
        .then((response) => {
          const updatedRows = [...rows];
          updatedRows[editingIndex] = response.data;
          setRows(updatedRows);
          setEditingIndex(null);
          setFormData({
            name: '',
            contact_person: '',
            phone: '',
            email: '',
            address: '',
            country: '',
            status: '',
          });
        })
        .catch((error) => {
          console.error('Error updating supplier:', error);
          setError('Failed to update the supplier. Please try again later.');
        });
    } else {
      // Add a new supplier
      axios
        .post('http://localhost:5000/api/suppliers', formData)
        .then((response) => {
          setRows((prevRows) => [...prevRows, response.data]);
          setFormData({
            name: '',
            contact_person: '',
            phone: '',
            email: '',
            address: '',
            country: '',
            status: '',
          });
        })
        .catch((error) => {
          console.error('Error adding supplier:', error);
          setError('Failed to add the supplier. Please try again later.');
        });
    }
  };

  // Breadcrumb for navigation
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Supplier Form',
    },
  ];

  // Handle editing an existing supplier
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(rows[index]);
  };

  // Handle deleting a supplier
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/suppliers/${id}`)
      .then(() => {
        setRows(rows.filter((row) => row.supplier_id !== id));
      })
      .catch((error) => {
        console.error('Error deleting supplier:', error);
        setError('Failed to delete the supplier. Please try again later.');
      });
  };

  return (
    <div style={{ padding: '0px' }}>
      <Breadcrumb title="Supplier Form" items={BCrumb} />

      <Typography variant="h4" gutterBottom>
        Supplier Management
      </Typography>

      {/* Display error message if any */}
      {error && (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Supplier Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Person"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
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
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {editingIndex !== null ? 'Update Supplier' : 'Add Supplier'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h5" gutterBottom>
        Supplier Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row.supplier_id}>
                  <TableCell>{row.supplier_name}</TableCell>
                  <TableCell>{row.contact_person}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(row.supplier_id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
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

export default SupplierForm;
