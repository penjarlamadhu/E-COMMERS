const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress) {
      return res
        .status(400)
        .json({ message: 'Please provide shipping address' });
    }

    // Get user's cart
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create order
    const order = await Order.create({
      userId: req.userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    // Check if user is an owner
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Access denied. Owner privileges required.' });
    }

    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Please provide status' });
    }

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = Date.now();
    await order.save();

    res.status(200).json({
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    // Check if user is an owner
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Access denied. Owner privileges required.' });
    }

    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete order (Admin only)
exports.deleteOrder = async (req, res) => {
  try {
    // Check if user is an owner
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Access denied. Owner privileges required.' });
    }

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
