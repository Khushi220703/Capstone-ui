import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Box,
    Modal,
    Snackbar,
    Button,
    Typography,
} from '@mui/material';
import { Add, Remove, Delete, Tune } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import  decodeToken  from '../utils/DecryptToken';
import { useAuth } from '../utils/AuthContext'; 
const CartPage = ({cartItem, setBuy}) => {
    const [cartItems, setCartItems] = useState([]);
    const [openCarousel, setOpenCarousel] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { token } = useAuth();
    const userId = decodeToken(token).id
    
    const getCart = async () => {
        //    const userId="poppihkjg68669"
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}cart/getCartItem/${userId}`);
               

                if(response.status === 404){
                    setCartItems([]);
                    return;
                }
                const data = await response.json();
                console.log(data.data);
                setCartItems(data.data);
            } catch (error) {
                console.log("There is an error from server side.", error);
            }
         }

    // Handle quantity increment/decrement
    const handleQuantityChange = async (id, isIncre) => {
        console.log(id,isIncre);
        
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}cart/updateQuantity/${id}/${isIncre}`);
            
            if(response.status === 200) getCart();
        } catch (error) {
            console.log("There is an error from the server side:", error);
            
        }
    };

    // Handle removing an item
    const handleRemoveItem = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}cart/deleteCartItem/${id}`);
           
            if(response.status === 200) getCart();
        } catch (error) {
            console.log("There is an error from server side:", error);
        }
    };

    // Handle image click to open carousel
    const handleImageClick = (images) => {
        setSelectedImages(images);
        setOpenCarousel(true);
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
    };

    const handleBuyProduct = async () => {
        try {
            const userId = cartItems[0]?.userId;
    
            const items = cartItems.map(({ userId, ...rest }) => rest); // remove userId from each item
    
            const totalAmount = cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0);
    
            const order = {
                userId,
                items, // each item has full product details
                totalAmount,
                status: "Pending",
                orderDate: new Date().toISOString(),
                shippingAddress: "123, Sample Street, City, Country", // replace with user input
                paymentMethod: "Cash on Delivery", // or other method
                transactionId: "TXN-" + Date.now(),
            };
    
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}orders/addOrder`,
                [order],
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );
    
            console.log("Order placed successfully:", response.data);
            // Optional: clear cart, redirect, etc.
            setCartItems([]);
    
        } catch (error) {
            console.error("Error placing order:", error?.response?.data || error.message);
        }
    };
    
    

    useEffect(() => {
        

         getCart();
    }, []);

   
    

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>

            {/* Check if there are no items in the cart */}
            {cartItems.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    Your cart is empty. Add some items to the cart!
                </Typography>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <img
                                            src={item.productId.imageUrl}
                                            alt={item.productId.title}
                                            style={{ width: 50, height: 50, cursor: 'pointer' }}
                                            onClick={() => handleImageClick(item.images)}
                                        />
                                    </TableCell>

                                    <TableCell>{item.productId.title}</TableCell>
                                    <TableCell>{item.productId.brandName}</TableCell>
                                    <TableCell>₹{item.productId.price}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton
                                                onClick={() => handleQuantityChange(item._id, 0)}
                                                disabled={item.quantity === 1}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <span>{item.quantity}</span>
                                            <IconButton
                                                onClick={() => handleQuantityChange(item._id, 1)}
                                                disabled={item.quantity >= item.maxStock}
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>
                                        {item.quantity >= item.maxStock && (
                                            <Typography variant="caption" color="error">
                                                Max stock reached
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>₹{item.productId.price * item.quantity}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleRemoveItem(item._id)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Grand Total and Checkout */}
            {cartItems.length  && (
                <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                    <Typography variant="h6">Grand Total: ₹{calculateTotal()}</Typography>
                    <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleBuyProduct}>
                        Proceed to Checkout
                    </Button>
                </Box>
            )}

            {/* Carousel Modal */}
            <Modal open={openCarousel} onClose={() => setOpenCarousel(false)}>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '600px',
                        margin: 'auto',
                        marginTop: '5%',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        height:"500px"
                    }}
                >
                    <Carousel
                        showThumbs={true}
                        infiniteLoop={true}
                        useKeyboardArrows={true}
                        dynamicHeight={true}
                        showArrows={true}
                        emulateTouch={true}
                    >
                        {selectedImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Slide ${index}`}
                                style={{
                                    width: '100%',
                                    maxHeight: '500px',
                                    borderRadius: '8px',
                                }}
                            />
                        ))}
                    </Carousel>
                </Box>
            </Modal>

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default CartPage;
