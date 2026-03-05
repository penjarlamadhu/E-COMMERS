import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import Error from '../components/Error';
import Success from '../components/Success';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    postal: user?.address?.postal || '',
    country: user?.address?.country || '',
    paymentMethod: 'cod',
  });

  const cartTotal = cart?.totalPrice || 0;
  const tax = cartTotal * 0.1;
  const finalTotal = cartTotal + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!formData.street || !formData.city || !formData.postal || !formData.country) {
      setError('Please fill in all address fields');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          postal: formData.postal,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
      };

      const response = await orderService.createOrder(orderData);
      setSuccess('Order placed successfully!');
      await clearCart();

      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (error) {
      setError(error.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="checkout-page">
        <Error message="Please login to checkout" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <Error message="Your cart is empty" />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {error && <Error message={error} onDismiss={() => setError(null)} />}
      {success && (
        <Success message={success} onDismiss={() => setSuccess(null)} />
      )}

      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-form-section">
          <form onSubmit={handlePlaceOrder}>
            <div className="form-section">
              <h2>Shipping Address</h2>

              <div className="form-group">
                <label>Street Address:</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  placeholder="123 Main Street"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="New York"
                  />
                </div>

                <div className="form-group">
                  <label>Postal Code:</label>
                  <input
                    type="text"
                    name="postal"
                    value={formData.postal}
                    onChange={handleInputChange}
                    required
                    placeholder="10001"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Country:</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  placeholder="United States"
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Payment Method</h2>

              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  Cash on Delivery
                </label>

                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleInputChange}
                  />
                  Credit Card
                </label>

                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                  />
                  PayPal
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="place-order-btn"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="order-items">
              {cart.items.map((item) => (
                <div key={item.productId} className="order-item">
                  <span>{item.productName}</span>
                  <span>x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr />

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
