import React from 'react';
import {
    Box,
    Grid,
    TextField,
    Button,
    Typography,
    Paper,
} from '@mui/material';

const LoginPage = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login form submitted');
    };

    return (
        <Box sx={{ height: '60vh', backgroundColor: '#f5f5f5', width:"50%", margin:"auto",marginTop:"10%"}}>
            <Grid container sx={{ height: '100%' }}>
                {/* Shopping Image Section */}
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

                {/* Login Form Section */}
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
                                required
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                required
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
                            <a href="#" style={{ textDecoration: 'none' }}>
                                Sign Up
                            </a>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;
