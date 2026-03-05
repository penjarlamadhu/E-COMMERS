import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import '../styles/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      setOrders(response.data.orders || response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      // Update local state
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      setError('Failed to update order status');
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Accepted': return 'status-accepted';
      case 'Rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  if (loading) {
    return (
      <div className="admin-orders-page">
        <div className="loading">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-orders-page">
        <div className="error-message">{error}</div>
        <button onClick={fetchOrders} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-header">
        <h1>Order Management</h1>
        <p>Manage customer orders - Accept or Reject</p>
      </div>

      <div className="orders-container">
        {orders.length === 0 ? (
          <div className="no-orders">
            <h3>No orders found</h3>
            <p>Orders will appear here once customers place them.</p>
          </div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Name</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.substring(0, 8).toUpperCase()}</td>
                  <td>{order.userId?.name || 'Unknown User'}</td>
                  <td>
                    {order.items && order.items.map((item, index) => (
                      <div key={index}>{item.productName}</div>
                    ))}
                  </td>
                  <td>
                    {order.items && order.items.map((item, index) => (
                      <div key={index}>{item.quantity}</div>
                    ))}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    {order.status === 'Pending' && (
                      <div className="action-buttons">
                        <button
                          onClick={() => updateOrderStatus(order._id, 'Accepted')}
                          className="accept-btn"
                        >
                          ✓ Accept
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order._id, 'Rejected')}
                          className="reject-btn"
                        >
                          ✗ Reject
                        </button>
                      </div>
                    )}
                    {order.status === 'Accepted' && (
                      <span className="status-text accepted">✓ Accepted</span>
                    )}
                    {order.status === 'Rejected' && (
                      <span className="status-text rejected">✗ Rejected</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

