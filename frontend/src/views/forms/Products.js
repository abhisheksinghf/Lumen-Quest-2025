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
        const formattedRows = response.data.map((row, index) => ({
          id: row.product_id, // Required by DataGrid
          ...row,
        }));
        setRows(formattedRows);
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
        .put(`http://localhost:5000/api/products/${editingIndex}`, formData)
        .then((response) => {
          const updatedRows = rows.map((row) =>
            row.id === editingIndex ? { ...row, ...formData } : row
          );
          setRows(updatedRows);
          resetForm();
        })
        .catch((error) => console.error('Error updating product:', error));
    } else {
      // Add a new product
      axios
        .post('http://localhost:5000/api/products', formData)
        .then((response) => {
          setRows((prevRows) => [
            ...prevRows,
            { id: response.data.product_id, ...response.data },
          ]);
          resetForm();
        })
        .catch((error) => console.error('Error adding product:', error));
    }
  };

  const resetForm = () => {
    setEditingIndex(null);
    setFormData({
      name: '',
      category: '',
      stock_level: '',
      reorder_point: '',
      description: '',
    });
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
  const handleEdit = (id) => {
    const product = rows.find((row) => row.id === id);
    if (product) {
      setEditingIndex(id);
      setFormData(product);
    }
  };

  // Handle deleting a product
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  // Export to CSV functionality
  const exportToCSV = () => {
    const headers = [
      'Product Name',
      'Category',
      'Stock Level',
      'Reorder Point',
      'Description',
    ];
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        [
          row.name,
          row.category,
          row.stock_level,
          row.reorder_point,
          row.description,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // DataGrid columns definition
  const columns = [
    { field: 'name', headerName: 'Product Name', flex: 1, sortable: true },
    { field: 'category', headerName: 'Category', flex: 1, sortable: true },
    { field: 'stock_level', headerName: 'Stock Level', flex: 1, sortable: true },
    {
      field: 'reorder_point',
      headerName: 'Reorder Point',
      flex: 1,
      sortable: true,
    },
    { field: 'description', headerName: 'Description', flex: 1, sortable: true },
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

      <Button
        variant="contained"
        color="secondary"
        style={{ marginBottom: '20px' }}
        onClick={exportToCSV}
      >
        Export to CSV
      </Button>

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

export default ProductForm;
