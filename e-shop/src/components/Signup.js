import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button } from '@mui/material';
import UserContext from '../common/UserContext';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    // Add your validation logic here
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.contactNumber) newErrors.contactNumber = 'Contact number is required';
    else if (!/^\d{10}$/.test(formData.contactNumber)) newErrors.contactNumber = 'Contact number is invalid';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     login({ username: formData.username, role: 'user' });
  //     navigate('/products');
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validate()) {
      // API call
      axios.post('http://localhost:3001/api/v1/users', formData)
        .then(response => {
          // Handle success
          console.log(response.data);
          login({ username: formData.username, role: 'user' });
          navigate('/products'); // Navigate to next page on successful signup
        })
        .catch(error => {
          // Handle error
          console.log(error);
          setErrors(prevErrors => ({
            ...prevErrors,
            apiError: 'An error occurred while trying to create an account. Please try again.'
          }));
        });
    }
  };

  return (
    <Container>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="First Name" 
          name="firstName" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required 
        />
        <TextField 
          label="Last Name" 
          name="lastName" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required 
        />
        <TextField 
          label="Email Address" 
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
          label="Contact Number" 
          name="contactNumber" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={formData.contactNumber}
          onChange={handleChange}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber}
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
        {/* <Button type="submit" variant="contained" color="primary">Signup</Button> */}
        <Button type="submit" variant="contained" color="primary">Signup</Button>
        {errors.apiError && <p style={{color: 'red'}}>{errors.apiError}</p>}
      </form>
    </Container>
  );
};
export default Signup