import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { path: '/admin', icon: '📊', label: 'Dashboard' },
    { path: '/admin/products', icon: '📦', label: 'Products' },
    { path: '/admin/orders', icon: '🛒', label: 'Orders' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button 
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link to="/" className="nav-item">
            <span className="nav-icon">🏠</span>
            {sidebarOpen && <span className="nav-label">Back to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`admin-content ${sidebarOpen ? '' : 'expanded'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

