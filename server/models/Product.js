const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: 0,
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/500x500?text=Product+Image',
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Jewelry', 'Other'],
    default: 'Other',
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
