const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = await Cart.create({ userId: req.userId, items: [] });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: 'Please provide productId and quantity' });
    }

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Get or create cart
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = await Cart.create({ userId: req.userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += Number(quantity);
    } else {
      // Add new item
      cart.items.push({
        productId,
        productName: product.name,
        price: product.price,
        quantity: Number(quantity),
        image: product.image,
      });
    }

    await cart.save();

    res.status(200).json({
      message: 'Item added to cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res
        .status(400)
        .json({ message: 'Please provide productId and quantity' });
    }

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    res.status(200).json({
      message: 'Cart updated successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Please provide productId' });
    }

    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      message: 'Cart cleared successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
