import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ E-Commerce Store
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/account" className="nav-link">
                  Account
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link">
                  My Orders
                </Link>
              </li>
              {user?.role === 'owner' && (
                <>
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link admin-link">
                      📊 Admin Panel
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <button
                  className="nav-link logout-btn"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}

          <li className="nav-item">
            <Link to="/cart" className="nav-link cart-link">
              🛒 Cart ({getCartCount()})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
