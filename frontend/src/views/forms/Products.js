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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock_level: '',
    reorder_point: '',
    description: '',
  });
  const [rows, setRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch all products when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (add or update a product)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update an existing product
      axios
        .put(`http://localhost:5000/api/products/${rows[editingIndex].product_id}`, formData)
        .then((response) => {
          const updatedRows = [...rows];
          updatedRows[editingIndex] = response.data;
          setRows(updatedRows);
          setEditingIndex(null);
          setFormData({
            name: '',
            category: '',
            stock_level: '',
            reorder_point: '',
            description: '',
          });
        })
        .catch((error) => console.error('Error updating product:', error));
    } else {
      // Add a new product
      axios
        .post('http://localhost:5000/api/products', formData)
        .then((response) => {
          // Ensure the rows are updated with the latest data
          setRows((prevRows) => [...prevRows, response.data]); // Using prevRows to ensure correct state update
          setFormData({
            name: '',
            category: '',
            stock_level: '',
            reorder_point: '',
            description: '',
          });
        })
        .catch((error) => console.error('Error adding product:', error));
    }
  };

  // Breadcrumb for navigation
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Product Form',
    },
  ];

  // Handle editing an existing product
  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(rows[index]);
  };

  // Handle deleting a product
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setRows(rows.filter((row) => row.product_id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div style={{ padding: '0px' }}>
      <Breadcrumb title="Product Form" items={BCrumb} />

      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stock Level"
              name="stock_level"
              value={formData.stock_level}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Reorder Point"
              name="reorder_point"
              value={formData.reorder_point}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {editingIndex !== null ? 'Update Product' : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h5" gutterBottom>
        Product Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock Level</TableCell>
              <TableCell>Reorder Point</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row.product_id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.stock_level}</TableCell>
                  <TableCell>{row.reorder_point}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(row.product_id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
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

export default ProductForm;
