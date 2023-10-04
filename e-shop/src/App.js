import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './common/UserContext';
import NavigationBar from './common/NavigationBar';
import Products from './components/Products';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const [user, setUser] = useState(null);
  const login = (user) => setUser(user);
  const logout = () => setUser(null);
  const isAdmin = user?.role === 'admin';

  const userContextValue = {
    isLoggedIn: Boolean(user),
    isAdmin,
    login,
    logout,
  };

  return (
    <Router>
      <UserContext.Provider value={userContextValue}>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </UserContext.Provider>
    </Router>
);
};
export default App;