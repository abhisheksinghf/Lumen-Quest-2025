import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid'; // MUI DataGrid component
import axios from 'axios';

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
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/suppliers')
      .then((response) => {
        const formattedRows = response.data.map((row, index) => ({
          id: row.supplier_id,
          ...row,
        }));
        setRows(formattedRows);
      })
      .catch((error) => console.error('Error fetching suppliers:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      axios
        .put(`http://localhost:5000/api/suppliers/${editingIndex}`, formData)
        .then((response) => {
          const updatedRows = rows.map((row) =>
            row.id === editingIndex ? { ...row, ...formData } : row
          );
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
      axios
        .post('http://localhost:5000/api/suppliers', formData)
        .then((response) => {
          setRows((prevRows) => [
            ...prevRows,
            { id: response.data.supplier_id, ...response.data },
          ]);
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

  const handleEdit = (id) => {
    const supplier = rows.find((row) => row.id === id);
    if (supplier) {
      setEditingIndex(id);
      setFormData(supplier);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/suppliers/${id}`)
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting supplier:', error);
        setError('Failed to delete the supplier. Please try again later.');
      });
  };

  const exportToCSV = () => {
    const headers = [
      'Supplier Name',
      'Contact Person',
      'Phone',
      'Email',
      'Address',
      'Country',
    ];
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        [
          row.name,
          row.contact_person,
          row.phone,
          row.email,
          row.address,
          row.country,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'suppliers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { field: 'name', headerName: 'Supplier Name', flex: 1 },
    { field: 'contact_person', headerName: 'Contact Person', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
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
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Supplier Management
      </Typography>

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
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {editingIndex !== null ? 'Update Supplier' : 'Add Supplier'}
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

export default SupplierForm;
