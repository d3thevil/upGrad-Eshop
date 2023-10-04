import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Snackbar } from '@mui/material';
import axios from 'axios';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [products, setProducts] = useState([]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('/api/v1/products', {
        name: productName,
        description: productDescription,
      });

      setSnackbarMessage(`Product ${productName} added successfully.`);
      setSnackbarOpen(true);

      setProductName('');
      setProductDescription('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/api/v1/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const inputStyle = {
    marginBottom: '16px', // Add margin at the bottom of each input field
  };

  const buttonStyle = {
    marginTop: '16px', // Add margin at the top of the button
  };

  return (
    <Container>
      <h1 style={{ marginBottom: '24px' }}>Add Product Page</h1>
      <form>
        <TextField
          label="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          fullWidth
          style={inputStyle}
        />
        <TextField
          label="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          style={inputStyle}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          style={buttonStyle}
        >
          Add Product
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default AddProduct;
