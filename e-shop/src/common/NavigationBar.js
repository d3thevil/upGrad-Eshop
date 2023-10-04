import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Typography, Container, TextField } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/system';
import axios from 'axios';
import UserContext from './UserContext';
const CustomLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin-right: 16px;
`;

const SearchInput = styled(TextField)`
  @media (max-width: 600px) {
    width: 150px;
  }
  width: 300px;
  margin-left: 16px;
  margin-right: 26px;
  && .MuiOutlinedInput-root {
    color: white;
    border-color: white;
  }
`;
const NavigationBar = () => {
    const { isLoggedIn, isAdmin, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(`/api/products?search=${searchQuery}`);
        console.log('Search Results:', response.data);
        setSearchQuery(''); 
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
  
    return (
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <IconButton edge="start" color="inherit" aria-label="logo" onClick={() => navigate('/')}>
              <ShoppingCart />
              <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                upGrad Eshop
              </Typography>
            </IconButton>
            <div style={{ flexGrow: 1 }} />
            {isLoggedIn ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <form onSubmit={handleSearch}>
                    <SearchInput 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..." 
                      variant="outlined" 
                      size="small" 
                    />
                  </form>
                  <Button type="submit" color="inherit" onClick={handleSearch}>Search</Button>
                </div>
                <CustomLink to="/home">
                  <Button color="inherit">Home</Button>
                </CustomLink>
                <Button color="inherit" onClick={logout}>Logout</Button>
                {isAdmin && (
                  <CustomLink to="/add-product">
                    <Button color="inherit">Add Product</Button>
                  </CustomLink>
                )}
              </>
            ) : (
              <>
                <CustomLink to="/login">
                  <Button color="inherit">Login</Button>
                </CustomLink>
                <CustomLink to="/signup">
                  <Button color="inherit">Signup</Button>
                </CustomLink>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    );
  };
  export default NavigationBar