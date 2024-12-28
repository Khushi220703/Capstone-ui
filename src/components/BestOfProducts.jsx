import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';

const categories = [
    {
        title: 'Best of Electronics',
        products: [
            { name: 'Laptop', image: 'https://www.cnet.com/a/img/resize/483f6629791616f58f3a205df4d52e40b8cba429/hub/2024/03/06/725a8e72-aa72-439a-9357-af161b30f3c9/apple-macbook-air-m3-2024-14.jpg?auto=webp&fit=crop&height=1200&width=1200' },
            { name: 'Headphones', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQkmq3v-8xK8udelgOsZOIbdW7LcWXjujc_6n06-9YcmFdSqAhMMtMEhVDmpjeBFhxXWIrA2uXRWysEAYbEXvJ3IUJX0Ub2GII6n368exA&usqp=CAE' },
            { name: 'Smartphone', image: 'https://5.imimg.com/data5/SELLER/Default/2024/2/385165657/OU/TF/VM/210446365/samsung-galaxy-s10-sm-g973u-128gb-6gb-factory-unlocked-smartphone-new-sealed.jpeg' },
            { name: 'Camera', image: 'https://i.pinimg.com/736x/e7/5d/db/e75ddbda351d44e24b6b8099fa200aad.jpg' },
        ],
    },
    {
        title: 'Best of Dresses',
        products: [
            { name: 'Summer Dress', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT-4eHHvK39V0VeNB5kysiYeVW_8YNga8N9UVRkDFoRTeNFMQoDMzrtkpeDaQZ6kmMy_zhIzL6BA7hmvj4ayLWS8DhcIbOvN5pbxHndYLYc&usqp=CAE' },
            { name: 'Party Wear', image: 'https://tiimg.tistatic.com/fp/2/007/915/comfortable-breathable-sleeveless-princess-gowns-with-beautiful-veil-421.jpg' },
            { name: 'Formal Shirt', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQa0Z04L4ZCkbtBDf8a6H1Ygbo-dpg4yfpkJHPMm7_TwKjmWJ2KsEQW1HZrPmbvtIARAGobLwfY0I_fJRQEfAgsfvCOQWI5bX7mb6af1PFT&usqp=CAE' },
            { name: 'Kids Wear', image: 'https://www.bangaloredesignerboutique.com/wp-content/uploads/2022/07/p5-1.jpg' },
        ],
    },
    {
        title: 'Best of Cosmetics',
        products: [
            { name: 'Lipstick', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT7j1pvVjlUKpiQ3cq7h3u7FLFdUvxxP7dcv17THJYK1cM23FC9pf96OURDfeylwEoS_4M5k3OO1m3baV-U435VvxVcJjJTzosbLkoxcwk&usqp=CAE' },
            { name: 'Foundation', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSBiHhDR6liKWP_3HWI0c9mXAAdY9-BxzxkE5lJ7abMojR1tppgDB9ZjIWQ41MA8roZJzd0zQ0j8RiTmXrSnSHjOJWsYnrmjs7n0kwqQCM&usqp=CAE' },
            { name: 'Eyeliner', image: 'https://tartecosmetics.com/dw/image/v2/BJRL_PRD/on/demandware.static/-/Sites-master-catalog-tarte/default/dw56494d6d/796/RECTANGLE_ALT/796-tarteist-double-take-eyeliner-black-ALT-5.jpg?sw=265' },
            { name: 'Perfume', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSX8oKKEQvK6gkfj3prbhdT08oNaVf2EdWulbMsiqjSX3Y2zq9TFg9NdfyTeCTmwgV9R7ZX47kFSvoKfiW0Wuho2m6CU3J4oZaqhRfXv3QBNXvu18NxsNYd&usqp=CAE' },
        ],
    },
];

const BestOfProducts = () => {
    return (
        <Box sx={{ padding: 3 }}>
            {categories.map((category, index) => (
                <Box key={index} sx={{ marginBottom: 4 }}>
                    <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                        {category.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: "center", overflowX: 'auto', gap: 3 }}>
                        {category.products.map((product, idx) => (
                            <Card
                                key={idx}
                                sx={{
                                    width: 400, 
                                    height: 400, 
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    borderRadius: 2,
                                    overflow: 'hidden', 
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: '100%',
                                        height: '70%', 
                                        objectFit: 'contain',
                                    }}
                                    image={product.image}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: '#333',
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default BestOfProducts;
