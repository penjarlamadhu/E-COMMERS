import React, { useEffect, useState } from 'react';
import '../styles/Products.css';
import { productService } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [category, sort]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const params = {};
      if (category) params.category = category;
      if (sort) params.sort = sort;

      const response = await productService.getAllProducts(params);
      setProducts(response.data.products);
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
      setSuccess('Product added to cart!');
    } catch (error) {
      setError(error.message);
    }
  };

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home',
    'Sports',
  ];

  return (
    <div className="products-page">
      {error && <Error message={error} onDismiss={() => setError(null)} />}
      {success && (
        <Success message={success} onDismiss={() => setSuccess(null)} />
      )}

      <h1>All Products</h1>

      <div className="filters-container">
        <div className="filter-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

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
        <p className="no-products">No products found</p>
      )}
    </div>
  );
};

export default Products;
