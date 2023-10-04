import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Snackbar } from '@mui/material';
import { Alert } from '@mui/lab';
import UserContext from '../common/UserContext';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    
    const [formData, setFormData] = useState({
      email: '',  
      password: '',
    });
  
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '' });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const validate = () => {
      let newErrors = {};
    
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 4) {
        newErrors.password = 'Password must be at least 4 characters';
      } 
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleApiCall = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:3001/api/v1/auth', formData);
        setLoading(false);
        
        const { data } = response;
        login({ username: data.username, role: data.role });
        setAlert({ open: true, message: `Welcome back, ${data.firstName}!` });

        setTimeout(() => navigate('/products'), 2000);

      } catch (error) {
        setLoading(false);
        console.error("An error occurred during login:", error);
        if (error.response) {
          setErrors({ apiError: "Invalid credentials" });
        } else {
          setErrors({ apiError: "An unexpected error occurred" });
        }
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validate()) {
        handleApiCall();
      }
    };
  
    return (
      <Container>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Email" 
            name="email" 
            type="email"  
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required 
          />
          <TextField 
            label="Password" 
            name="password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required 
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {errors.apiError && <p style={{ color: 'red' }}>{errors.apiError}</p>}
        </form>
        <Snackbar 
            open={alert.open} 
            autoHideDuration={3000} 
            onClose={() => setAlert({ ...alert, open: false })}
        >
            <Alert 
                onClose={() => setAlert({ ...alert, open: false })} 
                severity="success" 
                elevation={6} 
                variant="filled"
            >
                {alert.message}
            </Alert>
        </Snackbar>
      </Container>
    );
};

export default Login;
