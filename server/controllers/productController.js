const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, sort } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    let query = Product.find(filter);

    if (sort === 'price-low') {
      query = query.sort({ price: 1 });
    } else if (sort === 'price-high') {
      query = query.sort({ price: -1 });
    } else if (sort === 'newest') {
      query = query.sort({ createdAt: -1 });
    } else if (sort === 'rating') {
      query = query.sort({ rating: -1 });
    }

    const products = await query;

    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    if (!name || !description || !price) {
      return res.status(400).json({
        message: 'Please provide name, description, and price',
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
