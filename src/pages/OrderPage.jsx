import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Box, Modal, Typography, Snackbar, Button, Chip, Collapse
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import  decodeToken  from '../utils/DecryptToken';
import { useAuth } from '../utils/AuthContext'; 
const OrderHistoryPage = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [openCarousel, setOpenCarousel] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);
    const { token } = useAuth();
    const userId = decodeToken(token).id;
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}orders/getAllOrder/${userId}`);
                console.log(res);
                
                setOrderHistory(res.data.data);
            } catch (err) {
                console.error('Error fetching order history:', err);
                setOrderHistory([]); // fallback
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const handleImageClick = (images) => {
        setSelectedImages(images);
        setOpenCarousel(true);
    };

    const handleSnackbarClose = () => setOpenSnackbar(false);

    const handleAction = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const handleRowToggle = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'success';
            case 'In Transit': return 'warning';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>Order History</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderHistory.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <Typography variant="body1" sx={{ py: 3 }}>
                                        No order history available.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            orderHistory.map((order) =>
                                order.items.map((item, idx) => (
                                    <React.Fragment key={`${order._id}-${idx}`}>
                                        <TableRow hover onClick={() => handleRowToggle(order._id)}>
                                            <TableCell>{order._id}</TableCell>
                                            <TableCell>{item.productId.
                                                title}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={item.productId
                                                        .imageUrl[0]}
                                                    alt={item.productId
                                                        .title}
                                                    style={{
                                                        width: 60, height: 60, cursor: 'pointer',
                                                        objectFit: 'cover', borderRadius: '5px',
                                                        border: '1px solid #ccc',
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleImageClick([item.productId
                                                            .imageUrl[0]]);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>₹{item.productId
                                                .price}</TableCell>
                                            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                                            <TableCell>
                                                <Chip label={order.status} color={getStatusColor(order.status)} />
                                            </TableCell>
                                            <TableCell>
                                                <Button size="small" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAction('Tracking order...');
                                                }}>
                                                    Track Order
                                                </Button>
                                                <Button size="small" onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAction('Downloading invoice...');
                                                }}>
                                                    Download Invoice
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        {/* <TableRow>
                                            <TableCell colSpan={8} style={{ padding: 0, border: 0 }}>
                                                <Collapse in={expandedRow === order._id} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 2 }}>
                                                        <Typography variant="body2">
                                                            {order.shippingAddress}
                                                        </Typography>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow> */}
                                    </React.Fragment>
                                ))
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={openCarousel} onClose={() => setOpenCarousel(false)}>
                <Box sx={{
                    width: '100%', maxWidth: '600px', margin: 'auto', marginTop: '5%',
                    backgroundColor: 'white', borderRadius: '8px', height: '500px',
                }}>
                    <Carousel showThumbs infiniteLoop useKeyboardArrows dynamicHeight showArrows emulateTouch>
                        {selectedImages.map((image, index) => (
                            <img key={index} src={image} alt={`Slide ${index}`}
                                style={{ width: '100%', maxHeight: '600px', borderRadius: '8px' }} />
                        ))}
                    </Carousel>
                </Box>
            </Modal>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default OrderHistoryPage;
