import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Paper,
} from '@mui/material';
import { validateEmail, validatePassword } from '../utils/FormValidation';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext'; 
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const { token, login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
    });

    const navigate = useNavigate();

    // Update state when autofill happens
    useEffect(() => {
        const emailField = document.querySelector('input[name="email"]');
        const passwordField = document.querySelector('input[name="password"]');
        
        const handleAutofill = () => {
            setFormData({
                email: emailField.value,
                password: passwordField.value,
            });
        };

        emailField.addEventListener('input', handleAutofill);
        passwordField.addEventListener('input', handleAutofill);

        return () => {
            emailField.removeEventListener('input', handleAutofill);
            passwordField.removeEventListener('input', handleAutofill);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, ":", value);

        setFormData({ ...formData, [name]: value });
        setError({ ...error, [`${name}Error`]: '' });
    };

    const validateForm = () => {
        const formError = {
            emailError: validateEmail(formData.email),
            passwordError: validatePassword(formData.password),
        };

        setError(formError);

        return Object.values(formError).every((err) => err === '');
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validateForm()) return;
        console.log(import.meta.env.VITE_API_URL);
        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}user/login`,
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            
            if(response.status >= 400 && response.status < 500){
                console.log(response.data.message);
                
            }
            
            if (response.status === 201) {
                console.log('Login successful:', response.data.message);
                login(response.data.token);
                navigate("/homePage");
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Box sx={{ height: '60vh', backgroundColor: '#f5f5f5', width: "50%", margin: "auto", marginTop: "10%" }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            height: '100%',
                            backgroundImage:
                                'url(https://focustelecom.pl/wp-content/uploads/2021/12/Bez-tytulu-500%C3%97333-px.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></Box>
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
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '400px',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                name="email"
                                required
                                onChange={handleInputChange}
                                error={!!error.emailError}
                                helperText={error.emailError}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                name="password"
                                required
                                onChange={handleInputChange}
                                error={!!error.passwordError}
                                helperText={error.passwordError}
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
                                Login
                            </Button>
                        </form>
                        <Typography>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ textDecoration: 'none' }}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;
