import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Cart = () => {
  const { cart, isLoading, error, fetchCart, updateCartItem, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <div className="not-authenticated">
          <h2>Please login to view your cart</h2>
          <Link to="/login" className="login-btn">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  if (error) return <Error message={error} />;

  const cartItems = cart?.items || [];
  const total = cart?.totalPrice || 0;

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId}>
                    <td className="product-cell">
                      <img src={item.image} alt={item.productName} />
                      <span>{item.productName}</span>
                    </td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          updateCartItem(item.productId, newQuantity);
                        }}
                        className="quantity-input"
                      />
                    </td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>

              <div className="summary-row">
                <span>Tax:</span>
                <span>₹{(total * 0.1).toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{(total + total * 0.1).toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>

              <Link to="/products" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
