import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await cartService.getCart();
      setCart(response.data.cart);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching cart');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      setError(null);
      const response = await cartService.addToCart({ productId, quantity });
      setCart(response.data.cart);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error adding to cart';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      setError(null);
      const response = await cartService.updateCartItem({ productId, quantity });
      setCart(response.data.cart);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error updating cart';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setError(null);
      const response = await cartService.removeFromCart({ productId });
      setCart(response.data.cart);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error removing item';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      const response = await cartService.clearCart();
      setCart(response.data.cart);
      return response.data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error clearing cart';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart?.totalPrice || 0;
  };

  const value = {
    cart,
    isLoading,
    error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
