/**
 * Seed Script to Populate MongoDB with Sample Products from DummyJSON API
 * Run: node seed.js
 */

require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const axios = require('axios');
const Product = require('./models/Product');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Map DummyJSON categories to our categories
const mapCategory = (dummyCategory) => {
  const categoryMap = {
    'smartphones': 'Electronics',
    'laptops': 'Electronics',
    'fragrances': 'Electronics',
    'skincare': 'Electronics',
    'groceries': 'Electronics',
    'home': 'Home',
    'furniture': 'Home',
    'tops': 'Clothing',
    'womens-dresses': 'Clothing',
    'womens-shoes': 'Clothing',
    'mens-shirts': 'Clothing',
    'mens-shoes': 'Clothing',
    'mens-watches': 'Clothing',
    'womens-watches': 'Clothing',
    'womens-bags': 'Clothing',
    'womens-jewellery': 'Jewelry',
    'sunglasses': 'Electronics',
    'automotive': 'Electronics',
    'motorcycle': 'Electronics',
    'lighting': 'Home',
  };
  return categoryMap[dummyCategory] || 'Other';
};

const transformDummyJSONProducts = (apiProducts) => {
  return apiProducts.map(product => ({
    name: product.title || product.name || 'Unknown Product',
    description: product.description || 'High-quality product available now',
    price: Math.round(product.price * 100), // Convert to INR (multiply by 100 for approximate conversion)
    image: product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/300',
    category: mapCategory(product.category),
    stock: product.stock || Math.floor(Math.random() * 100) + 1,
    rating: product.rating || Math.floor(Math.random() * 5 * 10) / 10,
    reviews: product.reviews?.length || Math.floor(Math.random() * 500),
  }));
};

const fetchProductsFromAPI = async () => {
  try {
    console.log('Fetching products from DummyJSON API...');
    const response = await axios.get('https://dummyjson.com/products?limit=100');
    
    if (response.data && response.data.products) {
      const transformedProducts = transformDummyJSONProducts(response.data.products);
      console.log(`✅ Fetched and transformed ${transformedProducts.length} products from API`);
      return transformedProducts;
    } else {
      console.error('❌ Invalid API response format');
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching products from API:', error.message);
    return [];
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Fetch products from DummyJSON API
    const sampleProducts = await fetchProductsFromAPI();
    if (!sampleProducts || sampleProducts.length === 0) {
      throw new Error('Failed to fetch products from API');
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert products from API
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${createdProducts.length} products!`);

    // Display seeded products
    console.log('\nSeeded Products (first 10):');
    createdProducts.slice(0, 10).forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });

    // Seed users (owner and sample users)
    console.log('\n🌱 Seeding users...');
    try {
      // Create owner account
      const ownerExists = await User.findOne({ email: 'owner@store.com' });
      if (!ownerExists) {
        const owner = await User.create({
          name: 'Store Owner',
          email: 'owner@store.com',
          password: 'owner123',
          role: 'owner',
        });
        console.log('✅ Created owner account: owner@store.com (password: owner123)');
      } else {
        console.log('ℹ️ Owner account already exists');
      }

      // Create sample customer accounts
      const sampleUsers = [
        { name: 'John Customer', email: 'john@example.com', password: 'user123', role: 'user' },
        { name: 'Jane Customer', email: 'jane@example.com', password: 'user123', role: 'user' },
      ];

      for (const userData of sampleUsers) {
        const userExists = await User.findOne({ email: userData.email });
        if (!userExists) {
          await User.create(userData);
          console.log(`✅ Created user account: ${userData.email}`);
        }
      }

      console.log('✅ User seeding completed');
    } catch (error) {
      console.error('❌ Error seeding users:', error.message);
    }

    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed and connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
