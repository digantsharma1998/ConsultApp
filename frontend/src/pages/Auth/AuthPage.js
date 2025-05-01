import React, { useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../store/slices/authSlice';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper,
  Alert,
  Stack
} from '@mui/material';

const AuthPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route index element={<LoginForm />} />
        </Routes>
      </Paper>
    </Container>
  );
};

// Login Component
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => console.error('Login failed:', err));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={formData.username}
        onChange={(e) => setFormData({...formData, username: e.target.value})}
        required
      />
      
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />
      
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      
      <Typography variant="body2" align="center">
        Don't have an account? <Link to="/auth/register">Register here</Link>
      </Typography>
    </Box>
  );
};

// Registration Component
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const { confirmPassword, ...registrationData } = formData;
    dispatch(register(registrationData))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => console.error('Registration failed:', err));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          label="Username"
          fullWidth
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          error={!!errors.username}
          helperText={errors.username}
          required
        />
        
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          error={!!errors.password}
          helperText={errors.password || 'Minimum 6 characters'}
          required
        />
        
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          required
        />
      </Stack>
      
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>
      
      <Typography variant="body2" align="center">
        Already have an account? <Link to="/auth/login">Login here</Link>
      </Typography>
    </Box>
  );
};

export default AuthPage;