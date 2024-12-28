import React, { useState } from 'react';
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
import { Add, Remove, Delete } from '@mui/icons-material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CartPage = ({cartItem,setBuy}) => {
    const [cartItems, setCartItems] = useState(cartItem)

    const [openCarousel, setOpenCarousel] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Handle quantity increment/decrement
    const handleQuantityChange = (id, action) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQuantity =
                        action === 'increment'
                            ? Math.min(item.quantity + 1, item.maxStock)
                            : Math.max(1, item.quantity - 1);

                    if (newQuantity !== item.quantity) {
                        setSnackbarMessage(
                            action === 'increment'
                                ? `Increased quantity of ${item.name}`
                                : `Decreased quantity of ${item.name}`
                        );
                        setOpenSnackbar(true);
                    }

                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    // Handle removing an item
    const handleRemoveItem = (id) => {
        const itemName = cartItems.find((item) => item.id === id)?.name || '';
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        setSnackbarMessage(`Removed ${itemName} from the cart`);
        setOpenSnackbar(true);
    };

    // Handle image click to open carousel
    const handleImageClick = (images) => {
        setSelectedImages(images);
        setOpenCarousel(true);
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleBuyProduct = () => {
       
        cartItems.forEach((product) => {
            setBuy((prevOrders) => [
                ...prevOrders,
                {
                    id: `ORD${Date.now()}`,
                    productName: product.productName,
                    price: product.price,
                    quantity: product.quantity,
                    orderDate: new Date().toISOString().split('T')[0], 
                    status: 'Shipped',
                    images: product.images,
                    shippingDetails: `Delivered to 1234 Street, City Name, Country.`,
                },
            ]);
    
            console.log(`Order placed for ${product.productName}. Status: Shipped.`);
        });
    
       
        setCartItems([]);
    };
    
      

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>
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
                                        src={item.images[0]}
                                        alt={item.name}
                                        style={{ width: 50, height: 50, cursor: 'pointer' }}
                                        onClick={() => handleImageClick(item.images)}
                                    />
                                </TableCell>

                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.brandName}</TableCell>
                                <TableCell>₹{item.price}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton
                                            onClick={() => handleQuantityChange(item.id, 'decrement')}
                                            disabled={item.quantity === 1}
                                        >
                                            <Remove />
                                        </IconButton>
                                        <span>{item.quantity}</span>
                                        <IconButton
                                            onClick={() => handleQuantityChange(item.id, 'increment')}
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
                                <TableCell>₹{item.price * item.quantity}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                <Typography variant="h6">Grand Total: ₹{calculateTotal()}</Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleBuyProduct}>
                    Proceed to Checkout
                </Button>
            </Box>

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
