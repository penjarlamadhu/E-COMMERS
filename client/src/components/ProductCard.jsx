import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    onAddToCart(product._id, quantity);
    setQuantity(1);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x500?text=Product';
          }}
        />
        <span className="product-category">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-description">
          {product.description.substring(0, 100)}...
        </p>

        <div className="product-rating">
          ⭐ {product.rating.toFixed(1)} ({product.reviews} reviews)
        </div>

        <div className="product-footer">
          <span className="product-price">₹{product.price.toFixed(2)}</span>

          {product.stock > 0 ? (
            <span className="product-stock">✓ In Stock</span>
          ) : (
            <span className="product-out-of-stock">Out of Stock</span>
          )}
        </div>

        <Link to={`/product/${product._id}`} className="view-details-btn">
          View Details
        </Link>

        <div className="add-to-cart-section">
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            disabled={product.stock === 0}
            className="quantity-input"
          />
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
