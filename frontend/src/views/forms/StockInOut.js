import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid'; // MUI DataGrid component
import axios from 'axios';

const TransactionManagement = () => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/transactions') // Endpoint for fetching transactions
      .then((response) => {
        const formattedRows = response.data.map((row) => ({
          id: row.transaction_id,
          ...row,
        }));
        setRows(formattedRows);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
        setError('Failed to load transactions. Please try again later.');
      });
  }, []);

  const handleEdit = (id) => {
    // Edit logic can be implemented if needed
    console.log(`Edit transaction with ID: ${id}`);
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
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   flex: 1,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <>
    //       <IconButton
    //         color="primary"
    //         onClick={() => handleEdit(params.row.id)}
    //       >
    //         <Edit />
    //       </IconButton>
    //       <IconButton
    //         color="secondary"
    //         onClick={() => handleDelete(params.row.id)}
    //       >
    //         <Delete />
    //       </IconButton>
    //     </>
    //   ),
    // },
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

export default TransactionManagement;
