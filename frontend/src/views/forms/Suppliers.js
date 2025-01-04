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

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    product_id: '',
    user_id: '',
    transaction_type: '',
    quantity: '',
    transaction_date: '',
    remarks: '',
  });

  const [rows, setRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/transactions') // Endpoint for fetching transactions
      .then((response) => {
        const formattedRows = response.data.map((row, index) => ({
          id: row.transaction_id,
          ...row,
        }));
        setRows(formattedRows);
      })
      .catch((error) => console.error('Error fetching transactions:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      axios
        .put(`http://localhost:5000/api/transactions/${editingIndex}`, formData)
        .then((response) => {
          const updatedRows = rows.map((row) =>
            row.id === editingIndex ? { ...row, ...formData } : row
          );
          setRows(updatedRows);
          setEditingIndex(null);
          setFormData({
            product_id: '',
            user_id: '',
            transaction_type: '',
            quantity: '',
            transaction_date: '',
            remarks: '',
          });
        })
        .catch((error) => {
          console.error('Error updating transaction:', error);
          setError('Failed to update the transaction. Please try again later.');
        });
    } else {
      axios
        .post('http://localhost:5000/api/transactions', formData)
        .then((response) => {
          setRows((prevRows) => [
            ...prevRows,
            { id: response.data.transaction_id, ...response.data },
          ]);
          setFormData({
            product_id: '',
            user_id: '',
            transaction_type: '',
            quantity: '',
            transaction_date: '',
            remarks: '',
          });
        })
        .catch((error) => {
          console.error('Error adding transaction:', error);
          setError('Failed to add the transaction. Please try again later.');
        });
    }
  };

  const handleEdit = (id) => {
    const transaction = rows.find((row) => row.id === id);
    if (transaction) {
      setEditingIndex(id);
      setFormData(transaction);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/transactions/${id}`)
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting transaction:', error);
        setError('Failed to delete the transaction. Please try again later.');
      });
  };

  const exportToCSV = () => {
    const headers = [
      'Product ID',
      'User ID',
      'Transaction Type',
      'Quantity',
      'Transaction Date',
      'Remarks',
    ];
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        [
          row.product_id,
          row.user_id,
          row.transaction_type,
          row.quantity,
          row.transaction_date,
          row.remarks,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { field: 'product_id', headerName: 'Product ID', flex: 1 },
    { field: 'user_id', headerName: 'User ID', flex: 1 },
    { field: 'transaction_type', headerName: 'Transaction Type', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'transaction_date', headerName: 'Transaction Date', flex: 1 },
    { field: 'remarks', headerName: 'Remarks', flex: 1 },
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
        Transaction Management
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
              label="Product ID"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="User ID"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Transaction Type"
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Transaction Date"
              name="transaction_date"
              value={formData.transaction_date}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {editingIndex !== null ? 'Update Transaction' : 'Add Transaction'}
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

export default TransactionForm;
