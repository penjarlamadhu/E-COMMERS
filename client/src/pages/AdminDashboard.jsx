import React, { useState, useEffect } from 'react';
import { productService, orderService } from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    acceptedOrders: 0,
    rejectedOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsRes = await productService.getAllProducts();
      const products = productsRes.data.products || productsRes.data;
      
      // Fetch orders
      const ordersRes = await orderService.getAllOrders();
      const orders = ordersRes.data.orders || ordersRes.data;
      
      // Calculate stats
      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'Pending').length,
        acceptedOrders: orders.filter(o => o.status === 'Accepted').length,
        rejectedOrders: orders.filter(o => o.status === 'Rejected').length
      });
      
      // Get recent orders (last 5)
      setRecentOrders(orders.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingOrders}</h3>
            <p>Pending Orders</p>
          </div>
        </div>
        <div className="stat-card accepted">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.acceptedOrders}</h3>
            <p>Accepted Orders</p>
          </div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>{stats.rejectedOrders}</h3>
            <p>Rejected Orders</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/products" className="action-card">
            <span className="action-icon">➕</span>
            <span>Add Product</span>
          </Link>
          <Link to="/admin/orders" className="action-card">
            <span className="action-icon">📋</span>
            <span>View Orders</span>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <Link to="/admin/orders" className="view-all-link">View All</Link>
        </div>
        
        {recentOrders.length === 0 ? (
          <div className="no-orders">
            <p>No orders yet</p>
          </div>
        ) : (
          <table className="recent-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.substring(0, 8).toUpperCase()}</td>
                  <td>{order.userId?.name || 'Unknown'}</td>
                  <td>{order.items?.[0]?.productName || 'N/A'}</td>
                  <td>{order.items?.[0]?.quantity || 0}</td>
                  <td>
                    <span className={`status-badge ${order.status?.toLowerCase()}`}>
                      {order.status}
                    </span>
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

export default AdminDashboard;

