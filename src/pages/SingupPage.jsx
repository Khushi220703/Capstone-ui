import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Paper,
    
} from '@mui/material';
import { validateEmail, validateName, validatePassword } from '../utils/FormValidation';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'; 
const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { token, login } = useAuth();
    const [error, setError] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
    });

    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [`${name}Error`]: '' }); 
    };

    const validateForm = () => {
        const formError = {
            nameError: validateName(formData.name),
            emailError: validateEmail(formData.email),
            passwordError: validatePassword(formData.password),
            confirmPasswordError: 
                formData.password !== formData.confirmPassword ? "Passwords do not match" : "",
        };

        setError(formError);

        return Object.values(formError).every((err) => err === '');
    };

    const handleSignup = async (e) => {
        e.preventDefault();
      
        
        if (validateForm()) return; 
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}user/register`,
                formData,
                {
                  headers: { 'Content-Type': 'application/json' },
                }
              );
            
            if(response.status === 400){
                console.log(response.data.message);
                
            }
            if(response.status === 409){
                console.log(response.data.message);
                
            }
            if (response.status === 201) {
                console.log('Signup successful:', response.data.message);
                login(response.data.token);
                navigate("/homePage");
               
            }
        } catch (error) {
            console.error('Signup failed:', error);
           
        }
    };

    return (
        <Box sx={{ height: '60vh', backgroundColor: '#f5f5f5', width: '50%', margin: 'auto', marginTop: '5%' }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            height: '100%',
                            backgroundImage: 'url(https://focustelecom.pl/wp-content/uploads/2021/12/Bez-tytulu-500%C3%97333-px.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            Sign Up
                        </Typography>
                        <form onSubmit={handleSignup}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                variant="outlined"
                                margin="normal"
                                value={formData.name}
                                onChange={handleInputChange}
                                error={!!error.nameError}
                                helperText={error.nameError}
                                
                                
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                variant="outlined"
                                margin="normal"
                                onChange={handleInputChange}
                                error={!!error.emailError}
                                helperText={error.emailError}
                               
                                
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                onChange={handleInputChange}
                                error={!!error.passwordError}
                                helperText={error.passwordError}
                            
                              
                            />
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                error={!!error.confirmPasswordError}
                                helperText={error.confirmPasswordError}
                               
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    backgroundColor: '#1976d2',
                                }}
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Typography>
                            Already have an account?{' '}
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SignupPage;
