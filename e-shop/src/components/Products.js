import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  ButtonGroup,
  Button,
  CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import UserContext from '../common/UserContext';

const TruncatedTypography = styled(Typography)({
  display: '-webkit-box',
  '-webkit-line-clamp': 3,
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const Products = () => {
  
  const { isLoggedIn } = useContext(UserContext);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:3001/api/v1/products')
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter(product => product.name !== "V neck Shoulder Strap Dress");
      setOriginalProducts(filteredData);
      setFilteredProducts(filteredData);
    });

    fetch('http://localhost:3001/api/v1/products/categories')
    .then(response => response.json())
    .then(data => setCategories(data));
  }, [isLoggedIn, navigate]);

  let sortedProducts = [...filteredProducts];

  switch (sortType) {
    case 'priceHighToLow':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'priceLowToHigh':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'newest':
      sortedProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      break;
    default:
      break;
  }

  const handleCategoryClick = (category) => {
    if (category === "All") {
      setFilteredProducts(originalProducts);
    } else {
      const filtered = originalProducts.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };
  const handleBuyClick = (productId) => {
    navigate(`/product/${productId}`);
  }
  
  return (
    <Container>
      <h1>Products Page</h1>

      {/* Container for Category and Sorting buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>

        {/* Category Buttons */}
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" style={{ margin: '20px 0' }}>
          <Button onClick={() => handleCategoryClick("All")}>All</Button>
          {categories.map((category, index) => (
            <Button key={index} onClick={() => handleCategoryClick(category)}>
              {category}
            </Button>
          ))}
        </ButtonGroup>

        {/* Sorting ToggleButtons */}
        <div style={{ alignSelf: 'flex-start' }}>
          <ToggleButtonGroup value={sortType} exclusive onChange={(event, newSortType) => setSortType(newSortType)}>
            <ToggleButton value="default">Default</ToggleButton>
            <ToggleButton value="priceHighToLow">Price: High to Low</ToggleButton>
            <ToggleButton value="priceLowToHigh">Price: Low to High</ToggleButton>
            <ToggleButton value="newest">Newest</ToggleButton>
          </ToggleButtonGroup>
        </div>

      </div>

      {/* Product Grid */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {sortedProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card>
              <CardMedia image={product.imageURL} title={product.name} style={{ height: '140px' }} />
              <CardContent>
                <Typography variant="h6" component="div">{product.name}</Typography>
                <TruncatedTypography variant="body2" color="text.secondary">
                  {product.description}
                </TruncatedTypography>
                <Typography variant="body1">Price: ${product.price}</Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center', padding: '16px 0' }}>  {/* Aligning the button to center */}
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleBuyClick(product._id)}
                  style={{ padding: '8px 16px' }}  // Increase padding for a larger, more clickable area
                >
                  Buy
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
