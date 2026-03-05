import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getAllProducts();
      setProducts(response.data.products.slice(0, 6));
      setError(null);
    } catch (error) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      setSuccess(`Product added to cart!`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="home-page">
      {error && <Error message={error} onDismiss={() => setError(null)} />}
      {success && (
        <Success message={success} onDismiss={() => setSuccess(null)} />
      )}

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to E-Commerce Store</h1>
          <p>Find the best products at amazing prices</p>
          <Link to="/products" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>

        {isLoading ? (
          <Loading />
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <p className="no-products">No products available</p>
        )}

        <Link to="/products" className="view-all-btn">
          View All Products
        </Link>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-icon">🚚</div>
          <h3>Fast Shipping</h3>
          <p>Get your orders delivered quickly</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💳</div>
          <h3>Secure Payment</h3>
          <p>Safe and secure payment options</p>
        </div>
        <div className="feature">
          <div className="feature-icon">↩️</div>
          <h3>Easy Returns</h3>
          <p>30-day money back guarantee</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💬</div>
          <h3>24/7 Support</h3>
          <p>Dedicated customer support</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
