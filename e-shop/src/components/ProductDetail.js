import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  CardMedia,
  TextField,
  Button,
} from '@mui/material';
import { Snackbar, Alert } from '@mui/material';


const ProductDetail = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showUpdatedMessage, setShowUpdatedMessage] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState({
    houseNo: '',
    street: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  const handlePlaceOrder = () => {
    // Check if all address fields are filled
    for (let key in address) {
        if (!address[key]) {
            alert("Please fill in all address fields!");
            return;
        }
    }
    
    alert('Your order is confirmed.');
};


  const handleAddressChange = (e, field) => {
    setAddress(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  return (
    <Container>
      <Typography variant="h3">{product.name}</Typography>
      <CardMedia
        component="img"
        alt={product.name || "Product Image"}
        height="auto"
        width="100%"
        image={product.imageURL || "Path to a default image if image URL is not provided"}
        style={{objectFit: 'contain', maxHeight: '400px'}}
      />

      <Typography variant="body1">Price: ${product.price}</Typography>
      <TextField 
        type="number"
        label="Quantity"
        variant="outlined"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        fullWidth
        style={{ margin: '20px 0' }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setShowUpdatedMessage(true)}
        style={{ margin: '20px 0', marginRight: '10px' }}
      >
        Quantity
      </Button>
      {showUpdatedMessage && <Typography variant="body2" style={{ display: 'inline-block' }}>Quantity updated</Typography>}
      {/* Address Input Fields */}
      <Typography variant="h6" style={{ margin: '20px 0' }}>Shipping Address</Typography>
      <TextField
        label="House No."
        variant="outlined"
        value={address.houseNo}
        onChange={e => handleAddressChange(e, 'houseNo')}
        fullWidth
        style={{ margin: '10px 0' }}
      />
      <TextField
        label="Street"
        variant="outlined"
        value={address.street}
        onChange={e => handleAddressChange(e, 'street')}
        fullWidth
        style={{ margin: '10px 0' }}
      />
      <TextField
        label="City"
        variant="outlined"
        value={address.city}
        onChange={e => handleAddressChange(e, 'city')}
        fullWidth
        style={{ margin: '10px 0' }}
      />
      <TextField
        label="Country"
        variant="outlined"
        value={address.country}
        onChange={e => handleAddressChange(e, 'country')}
        fullWidth
        style={{ margin: '10px 0' }}
      />

      <Button variant="contained" color="secondary" onClick={handlePlaceOrder} style={{ margin: '20px 0' }}>
        Place Order
      </Button>
      <Snackbar
    open={showSnackbar}
    autoHideDuration={10000}
    onClose={() => setShowSnackbar(false)}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
>
    <Alert onClose={() => setShowSnackbar(false)} severity="success">
        Order placed successfully!
    </Alert>
</Snackbar>

    </Container>
  );
};

export default ProductDetail;
