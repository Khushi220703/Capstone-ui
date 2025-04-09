import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, TextField, Rating, Chip, Pagination } from '@mui/material';
import { data, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel'; // Import Carousel component
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS for carousel
import axios from 'axios';
import decodeToken from '../utils/DecryptToken';
import { useAuth } from '../utils/AuthContext';
const ProductView = ({setCartItems,setBuy}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedMaterial, setSelectedMaterial] = useState('Cotton');
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState({});
  const { id } = useParams();  
  const {token} = useAuth();
  const userId = decodeToken(token).id;

const handleAddToCart = async () => {
    console.log(`Added ${quantity} of ${product.name} (${product.brandName}) to the cart.`);
    
    setCartItems((prev) => {
        const existingItemIndex = prev.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
           
            const updatedCart = [...prev];
            const newQuantity = updatedCart[existingItemIndex].quantity + quantity;

            updatedCart[existingItemIndex].quantity = 
                newQuantity <= updatedCart[existingItemIndex].maxStock 
                    ? newQuantity 
                    : updatedCart[existingItemIndex].maxStock;

            return updatedCart;
        } else {
           
            return [
                ...prev,  
                { 
                    id: product.id,
                    name: product.title,
                    brandName: product.brandName,
                    price: product.price,
                    quantity: Math.min(quantity, product.maxStock), 
                    maxStock: product.maxStock,
                    images: product.imageUrl,
                }
            ];
        }
    });

    try {
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}cart/addToCart`, {
          productId: product._id,  
            userId,
            quantity: quantity,
        });

       
        console.log('Product added to cart:', response.data);

    } catch (error) {
        console.log("Failed to add item to cart:", error);
      
    }
};




  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}product/getProductById/${id}`); 
     
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("Fetched data:", data);
  
      // const productData = data.products.find((item) => item.id === parseInt(id));
      // console.log(productData);
      
      
      if (data) {
        setProduct(data[0]);
      } else {
        console.error("Product not found");
        setProduct({}); 
      }
  
    } catch (error) {
      console.log("There was an error fetching the product:", error);
    }
  };
 
  useEffect(() => {
    console.log("Fetching product data...");
    getProduct();
  }, [id]); 

  const reviewsPerPage = 5;
  const totalReviews = product.reviews ? product.reviews.length : 0; 
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = product.reviews ? product.reviews.slice(indexOfFirstReview, indexOfLastReview) : [];
 
  
  const handleBuyProduct = () => {
    
    setBuy((prevOrders) => [
        ...prevOrders,
        {
            id: 'ORD12345',
            productName: product.title,
            price: product.price,
            quantity: product.quantity,
            orderDate: new Date().toISOString().split('T')[0], 
            status: 'Shipped',
            images: product.imageUrl,
            shippingDetails: `Delivered to 1234 Street, City Name, Country.`,
        },
    ]);
  
    console.log(`Order placed for ${product.name}. Status: Shipped.`);
  };
  
  
  return (
    <Box sx={{ display: 'flex', padding: 4 }}>
     
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Carousel 
          selectedItem={product.availableColors ? product.availableColors.indexOf(selectedColor) : 0}
          dynamicHeight={false}
          showThumbs={false}
          showArrows={true}
          useKeyboardArrows
          infiniteLoop
        >
          {product.imageUrl && product.imageUrl.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  transition: 'all 0.3s ease',
                }}
              />
            </div>
          ))}
        </Carousel>
      </Box>

      {/* Product Details Section */}
      <Box sx={{ flex: 1, paddingLeft: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {product.title}
        </Typography>
        <Typography variant="h5" sx={{ color: '#ff5722', marginTop: 2 }}>
          ₹{product.price}
        </Typography>

        <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
          <Rating value={product.rating} readOnly />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            ({product.reviews ? product.reviews.length : 0} Reviews)
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ marginTop: 3, color: '#777' }}>
          {product.description}
        </Typography>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Key Features:
          </Typography>
          {product.features && product.features.map((feature, index) => (
            <Chip key={index} label={feature} sx={{ marginTop: 1, marginRight: 1 }} />
          ))}
        </Box>

        <Box sx={{ marginTop: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Quantity:
            </Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputProps={{ min: 1 }}
              sx={{ width: '60px' }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#007bf',
                '&:hover': { backgroundColor: '#007bff' },
                padding: '12px 20px',
                fontSize: '1.1rem',
                flexGrow: 1,
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#007bf',
                '&:hover': { backgroundColor: '#007bff' },
                padding: '12px 20px',
                fontSize: '1.1rem',
                flexGrow: 1,
              }}
              onClick={handleBuyProduct}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Reviews Section */}
      <Box sx={{ flex: 1, paddingLeft: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Reviews:
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          {currentReviews.map((review, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {review.reviewer}
              </Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                "{review.comment}"
              </Typography>
            </Box>
          ))}
        </Box>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{ marginTop: 2 }}
        />
      </Box>
    </Box>
  );
};

export default ProductView;
