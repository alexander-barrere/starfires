import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    let savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <CartItem key={item._id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
      ))}
      {/* Add checkout button and other functionalities as needed */}
    </div>
  );
};

export default Cart;
