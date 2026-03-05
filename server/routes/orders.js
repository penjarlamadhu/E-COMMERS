const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/create', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id/status', authMiddleware, updateOrderStatus);
router.get('/admin/all', authMiddleware, getAllOrders);

module.exports = router;
