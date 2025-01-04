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


const TelecomRouterForm = () => {
  const [formData, setFormData] = useState({
    routerName: '',
    model: '',
    ipAddress: '',
    location: '',
    status: '',
  });
  const [rows, setRows] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/routers')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => console.error('Error fetching routers:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update an existing row
      axios
        .put(`http://localhost:5000/api/routers/${rows[editingIndex]._id}`, formData)
        .then((response) => {
          const updatedRows = [...rows];
          updatedRows[editingIndex] = response.data;
          setRows(updatedRows);
          setEditingIndex(null);
          setFormData({ routerName: '', model: '', ipAddress: '', location: '', status: '' });
        })
        .catch((error) => console.error('Error updating router:', error));
    } else {
      // Add a new row
      axios
        .post('http://localhost:5000/api/routers', formData)
        .then((response) => {
          setRows([...rows, response.data]);
          setFormData({ routerName: '', model: '', ipAddress: '', location: '', status: '' });
        })
        .catch((error) => console.error('Error adding router:', error));
    }
  };
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Vertical Form',
    },
  ];

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(rows[index]);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/routers/${id}`)
      .then(() => {
        setRows(rows.filter((row) => row._id !== id));
      })
      .catch((error) => console.error('Error deleting router:', error));
  };

  return (
    <div style={{ padding: '0px' }}>
            <Breadcrumb title="Vertical Form" items={BCrumb} />

      <Typography variant="h4" gutterBottom>
        Telecom Router Management
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Router Name"
              name="routerName"
              value={formData.routerName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="IP Address"
              name="ipAddress"
              value={formData.ipAddress}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
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
              {editingIndex !== null ? 'Update Router' : 'Add Router'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h5" gutterBottom>
        Router Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Router Name</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell>{row.routerName}</TableCell>
                  <TableCell>{row.model}</TableCell>
                  <TableCell>{row.ipAddress}</TableCell>
                  <TableCell>{row.location}</TableCell>
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
                      onClick={() => handleDelete(row._id)}
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

export default TelecomRouterForm;
