import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div>
        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
        <span> Quantity: {item.quantity} </span>
        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
      </div>
      <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
    </div>
  );
};

export default CartItem;
