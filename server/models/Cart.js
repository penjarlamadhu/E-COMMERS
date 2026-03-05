const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      productName: String,
      price: Number,
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      image: String,
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate total price before saving
cartSchema.pre('save', function (next) {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
