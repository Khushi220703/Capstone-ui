import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Avatar, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const Menubar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                const getCategories = await fetch(`${import.meta.env.VITE_API_URL}product/getProductCategory`);
                const data = await getCategories.json();
                setCategories(data);
                console.log("Categories fetched successfully:", data);
            } catch (error) {
                console.log("Error while fetching product categories:", error);
            }
        })();
    }, []);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {categories.map((category, index) => (
                        <Tooltip key={index} title={category.category} arrow>
                            <Link to={`/products/${category.category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        margin: 1,
                                        padding: 1,
                                        position: 'relative',
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <Avatar
                                        src={category.imageUrl}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 0,
                                            marginBottom: 1,
                                        }}
                                    />

                                    <Typography variant="body2" sx={{ color: '#000' }}>
                                        {category.category}
                                    </Typography>
                                </Box>
                            </Link>
                        </Tooltip>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Menubar;
