// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addItemToCart = (item) => {
    let checkProducts=false;
    for(let i=0; i<cart.length; i++){
      if(cart[i].id === item.id){
        checkProducts = true
        if(cart[i].qty_val === undefined){
          cart[i].qty_val = 2
        }else{
          cart[i].qty_val = parseInt(cart[i].qty_val) + 1
        }
        break;
      }
    }
    if(!checkProducts){
      item.qty_val = 1
      setCart([...cart, item]);
    }else{
      setCart([...cart]);
    }
    document.querySelector('.cart_header').click();
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
