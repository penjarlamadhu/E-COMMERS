import React, { useEffect, useState } from 'react';
import '../styles/Orders.css';
import { orderService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Orders = () => {
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const isAdmin = user?.role === 'owner';

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      let response;
      if (isAdmin) {
        response = await orderService.getAllOrders();
      } else {
        response = await orderService.getUserOrders();
      }
      setOrders(isAdmin ? response.data.orders : response.data.orders);
      setError(null);
    } catch (error) {
      setError('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      setError('Failed to update order status');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="orders-page">
        <Error message="Please login to view your orders" />
      </div>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <div className="orders-page">
      <h1>{isAdmin ? 'All Orders' : 'My Orders'}</h1>

      {error && <Error message={error} onDismiss={() => setError(null)} />}

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>{isAdmin ? 'No orders found' : "You haven't placed any orders yet"}</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              <div className="order-header">
                <div>
                  <h3>Order ID: {order._id.substring(0, 8).toUpperCase()}</h3>
                  {isAdmin && order.userId && (
                    <p className="customer-name">Customer: {order.userId.name}</p>
                  )}
                  <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="order-status">
                  <span className={`status ${order.status}`}>{order.status.toUpperCase()}</span>
                  <span className="order-total">₹{order.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {isAdmin && order.status === 'Pending' && (
                <div className="admin-actions">
                  <button
                    className="accept-btn"
                    onClick={() => handleUpdateStatus(order._id, 'Accepted')}
                  >
                    ✓ Accept Order
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleUpdateStatus(order._id, 'Rejected')}
                  >
                    ✗ Reject Order
                  </button>
                </div>
              )}

              <button
                className="view-details-btn"
                onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
              >
                {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
              </button>

              {selectedOrder === order._id && (
                <div className="order-details">
                  <div className="order-items">
                    <h4>Items:</h4>
                    {order.items.map((item) => (
                      <div key={item.productId} className="detail-item">
                        <img src={item.image} alt={item.productName} />
                        <div>
                          <span>{item.productName}</span>
                          <span>x {item.quantity}</span>
                        </div>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-shipping">
                    <h4>Shipping Address:</h4>
                    <p>
                      {order.shippingAddress.street}, {order.shippingAddress.city}
                      <br />
                      {order.shippingAddress.postal}, {order.shippingAddress.country}
                    </p>
                  </div>

                  <div className="order-payment">
                    <h4>Payment Method:</h4>
                    <p>{order.paymentMethod.replace('_', ' ').toUpperCase()}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
