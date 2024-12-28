import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Modal,
    Typography,
    Snackbar,
    Button,
    Chip,
    Collapse,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const OrderHistoryPage = ({buy}) => {
    const [orderHistory, setOrderHistory] = useState(buy);
    console.log(buy);
    
    const [openCarousel, setOpenCarousel] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);

    
    const handleImageClick = (images) => {
        setSelectedImages(images);
        setOpenCarousel(true);
    };

   
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleAction = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const handleRowToggle = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'success';
            case 'In Transit':
                return 'warning';
            default:
                return 'default';
        }
    };



    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>
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
                        {orderHistory.map((order) => (
                            <>
                                <TableRow
                                    key={order.id}
                                    hover
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                    }}
                                    onClick={() => handleRowToggle(order.id)}
                                >
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.productName}</TableCell>
                                    <TableCell>
                                        <img
                                            src={order.images[0]}
                                            alt={order.title}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                cursor: 'pointer',
                                                objectFit: 'cover',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleImageClick(order.images);
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>₹{order.price * order.quantity}</TableCell>
                                    <TableCell>{order.orderDate}</TableCell>
                                    <TableCell>
                                        <Chip label={order.status} color={getStatusColor(order.status)} />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAction('Tracking order...');
                                            }}
                                        >
                                            Track Order
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAction('Downloading invoice...');
                                            }}
                                        >
                                            Download Invoice
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={8} style={{ padding: 0, border: 0 }}>
                                        <Collapse in={expandedRow === order.id} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 2 }}>
                                                <Typography variant="body2">{order.shippingDetails}</Typography>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
                                    maxHeight: '600px',
                                   
                                   
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
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
};

export default OrderHistoryPage;
