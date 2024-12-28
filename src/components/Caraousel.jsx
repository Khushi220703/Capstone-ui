import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Box } from '@mui/material';

const FlipkartCarousel = () => {
    const images = [
        "https://as1.ftcdn.net/v2/jpg/03/67/50/78/1000_F_367507896_ckaEMPqdjmKP22WkVjSBz0GSANm6XLqz.jpg",
        "https://pds01.b-cdn.net/wp-content/uploads/2021/10/aa893eb41ff3bc7fe0c708f66bcd0ec7.jpg",
        "https://the-white-dress.com/wp-content/uploads/2022/08/Blog-8822.jpg",
        "https://www.shutterstock.com/image-vector/happy-woman-doing-grocery-shopping-600w-2289505739.jpg",
        "https://binalpatel.in/cdn/shop/collections/banner-02-02.jpg?v=1703769498"
    ];

    return (
        <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
            <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={3000}
                showStatus={false}
                dynamicHeight={false}
                swipeable={true}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    const style = {
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: isSelected ? '#2874f0' : '#ccc',
                        margin: '0 6px',
                        cursor: 'pointer',
                    };
                    return (
                        <span
                            key={index}
                            style={style}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            role="button"
                            tabIndex={0}
                            aria-label={`${label} ${index + 1}`}
                        />
                    );
                }}
            >
                {images.map((image, index) => (
                    <Box key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '400px', 
                                objectFit: 'cover', 
                            }}
                        />
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default FlipkartCarousel;
