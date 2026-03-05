import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.css';
import { productService } from '../services/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getProductById(id);
      setProduct(response.data.product);
      setError(null);
    } catch (error) {
      setError('Failed to load product details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
      setSuccess('Product added to cart!');
      setQuantity(1);
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) return <Loading />;

  if (error || !product) return <Error message={error || 'Product not found'} />;

  return (
    <div className="product-detail-page">
      {error && <Error message={error} onDismiss={() => setError(null)} />}
      {success && (
        <Success message={success} onDismiss={() => setSuccess(null)} />
      )}

      <div className="product-detail-container">
        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=Product';
            }}
          />
        </div>

        <div className="product-info-section">
          <h1>{product.name}</h1>

          <div className="product-rating">
            <span>⭐ {product.rating.toFixed(1)}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="product-price-section">
            <h2 className="price">₹{product.price.toFixed(2)}</h2>
            <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
            </span>
          </div>

          <p className="category">Category: <strong>{product.category}</strong></p>

          <div className="product-description-section">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-stock-info">
            <p>Available Stock: {product.stock} units</p>
          </div>

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                disabled={product.stock === 0}
              />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="add-to-cart-btn-large"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          <div className="product-benefits">
            <h3>Why Buy This?</h3>
            <ul>
              <li>✓ Fast and Free Shipping</li>
              <li>✓ Secure Payment</li>
              <li>✓ 30-Day Returns</li>
              <li>✓ 24/7 Customer Support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
