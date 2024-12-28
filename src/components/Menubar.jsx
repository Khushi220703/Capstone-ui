import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import {Link} from 'react-router-dom';
const categories = [
    { name: 'Electronics', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcZHE5iJ7AfpfFxlkkXULywp5_XQqkPwciNQ&s', subcategories: ['Laptops', 'Cameras', 'Headphones'] },
    { name: 'Clothes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfCn1FqcwXPXwdmDMbyVhYkDakqHGBBGhrMA&s', subcategories: ['Men', 'Women', 'Kids'] },
    { name: 'Grocery', image: 'https://img.freepik.com/premium-vector/shopping-paper-bag-with-fresh-products-grocery-store-supermarket-food-drinks-milk-vegetables-meat-chicken-cheese-sausages-salad-bread-cereal-steak-egg_169241-2995.jpg?semt=ais_hybrid', subcategories: ['Fruits', 'Vegetables', 'Snacks'] },
    { name: 'Mobiles', image: 'https://tiimg.tistatic.com/fp/1/007/574/vivo-mobile-phone-7-38mm-ultra-smooth-body-170g-light-2-5d-adjusted-outline-for-a-great-hold-703.jpg', subcategories: ['Smartphones', 'Feature Phones', 'Accessories'] },
    { name: 'Fashion', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyKjF8v_VdDuI0fjZxr9_-mbYNW2VUJZaD0w&s', subcategories: ['Clothing', 'Shoes', 'Jewelry'] },
    { name: 'Home Appliances', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvRqFx8Xyiwdb371EoONyJHUBjuvGQi6C9wg&s', subcategories: ['Refrigerators', 'Washing Machines', 'Air Conditioners'] },
    { name: 'Top Offers', image: 'https://5.imimg.com/data5/KA/QG/MY-69672094/gift-box.jpg', subcategories: ['Discounts', 'Flash Sales', 'Special Deals'] },
    { name: 'Beauty', image: 'https://png.pngtree.com/png-clipart/20230511/original/pngtree-3d-skin-care-products-exquisite-care-set-png-image_9157466.png', subcategories: ['Makeup', 'Skincare', 'Haircare'] },
    { name: 'Toys', image: 'https://www.psychologs.com/wp-content/uploads/2023/07/The-Joy-of-Play-How-Toys-Boost-Our-Happy-Feelings-and-Mind.jpg', subcategories: ['Action Figures', 'Dolls', 'Educational'] },
];

const Menubar = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredCategory(index);
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {categories.map((category, index) => (
                        <Tooltip key={index} title={category.name} arrow>
                        <Link to={`/products/${category.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    margin: 2,
                                    padding: 1,
                                    position: 'relative',
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Avatar
                                    src={category.image}
                                    sx={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 0,
                                        marginBottom: 1,
                                    }}
                                />

                                <Typography variant="body2" sx={{ color: '#000' }}>
                                    {category.name}
                                </Typography>

                                {/* Subcategory Dropdown */}
                                {hoveredCategory === index && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '130px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            backgroundColor: '#f1f1f1',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                            borderRadius: '4px',
                                            zIndex: 10,
                                        }}
                                    >
                                        {category.subcategories.map((subcategory, subIndex) => (
                                            <MenuItem key={subIndex} sx={{ padding: '8px 16px' }}>
                                                {subcategory}
                                            </MenuItem>
                                        ))}
                                    </Box>
                                )}
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
