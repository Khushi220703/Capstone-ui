import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";


const ProductsPage = () => {
    const { category } = useParams();
    const [products,setProducts] = useState([]);
    const capitalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : category;

    const filteredProducts = products.filter((product) => product.category === capitalizedCategory);
   
   
    const getProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}product/getProducts`); 
           
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            
            setProducts(data); 
        } catch (error) {
            console.error("There was an error fetching the products:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);


    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4, fontWeight: 'bold' }}>
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
            </Typography>

            <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.imageUrl}
                                alt={product.title}
                                sx={{
                                    objectFit: 'contain',  
                                    width: '100%',        
                                    maxHeight: '200px',   
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {product.title}
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#ff5722', marginY: 1 }}>
                                    ₹{product.price}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#777' }}>
                                    Rating: {product.rating} ⭐
                                </Typography>
                               <Link to={`/products/${product.category}/${product._id}`} >
                               <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ marginTop: 2, backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
                                    onClick={() => console.log(`View Product: ${product.title}`)}
                                >
                                    View Details
                                </Button>
                               </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {filteredProducts.length === 0 && (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4 }}>
                        No products found in this category.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default ProductsPage;