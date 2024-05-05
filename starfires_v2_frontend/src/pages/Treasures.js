import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const Treasures = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://www.starfires.io/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(item => item._id === product._id);
        if (existingItem) {
            cartItems = cartItems.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

    return (
        <Container>
            <Row className='justify-content-md-center mt-5'>
                <Col md={8}>
                    <h1>Astrology Treasures</h1>
                    <p>Discover a curated selection of astrology books.</p>
                </Col>
            </Row>
            <Row>
                {products.map(product => (
                    <Col md={4} key={product._id}>
                        <Card>
                            <Card.Img variant='top' src={product.imageUrl || '/images/eBook1.jpg'} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Button variant='primary' onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Treasures;
