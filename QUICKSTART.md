# Quick Start Guide

This guide will help you get the E-Commerce application running locally in 5 minutes!

## ⚡ Quick Setup (5 Minutes)

### Step 1: Install Dependencies (2 min)

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 2: Set Up MongoDB (2 min)

**Option A: Local MongoDB (Recommended for quick start)**

Install MongoDB Community Edition from: https://www.mongodb.com/try/download/community

Start MongoDB:
```bash
# Windows
mongod

# macOS (with Homebrew)
brew services start mongodb-community

# Linux (Ubuntu)
sudo systemctl start mongod
```

**Option B: Cloud MongoDB (Skip installation)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string

### Step 3: Configure Backend (1 min)

Create `server/.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

If using MongoDB Atlas, replace MONGODB_URI with your connection string.

### Step 4: Start the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
# or npm run dev (with auto-reload)
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

✅ **Your app is ready!** Open: http://localhost:5173

---

## 🧪 Test the Application

### 1. Register a User
- Go to http://localhost:5173/register
- Fill in the form
- Submit

### 2. Login
- Go to http://localhost:5173/login
- Use the credentials you just created

### 3. Populate with Sample Data

In a new terminal:
```bash
cd server
node seed.js
```

This adds 15 sample products to your database!

### 4. Browse Products
- Homepage: http://localhost:5173
- Products page: http://localhost:5173/products
- Click on any product to see details

### 5. Test Shopping Cart
- Add products to cart
- Go to http://localhost:5173/cart
- Proceed to checkout
- Fill in shipping address
- Place order

### 6. View Orders
- Go to http://localhost:5173/orders
- See all your placed orders

### 7. Manage Account
- Go to http://localhost:5173/account
- Update your profile information

---

## 🔍 Verify Everything Works

### Backend Health Check
Open browser: http://localhost:5000/api/health

Should show:
```json
{"message":"Server is running"}
```

### Check Database Connection
Backend console should show:
```
MongoDB Connected: localhost
Server running on port 5000
```

### Frontend Connection
Frontend console should not show CORS errors

---

## 🛠️ Useful Commands

```bash
# Backend
cd server
npm start          # Start server
npm run dev        # Start with auto-reload (nodemon)
node seed.js       # Populate database with sample products

# Frontend
cd client
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 📝 API Examples

Test these with Postman or Thunder Client:

### Get all products
```
GET http://localhost:5000/api/products
```

### Get single product
```
GET http://localhost:5000/api/products/{product_id}
```

### Create a product (requires authentication)
```
POST http://localhost:5000/api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Test Product",
  "description": "Test Description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 10
}
```

### Register user
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

---

## ❌ Common Issues & Solutions

### Error: "MongoDB Connection Error"
**Solution:** Ensure MongoDB service is running
```bash
# Check if service is running
# Windows: Services app → MongoDB
# macOS: brew services list
# Linux: sudo systemctl status mongod
```

### Error: "Port 5000 already in use"
**Solution:** Change PORT in `.env` to a different number (e.g., 5001)

### Error: "Cannot find module"
**Solution:** Install dependencies
```bash
npm install
```

### CORS Error in Console
**Solution:** Restart backend server and ensure CLIENT_URL is correct in `.env`

### Frontend won't load
**Solution:** 
1. Check if Vite dev server is running (Terminal 2)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check browser console for errors

---

## 📚 Useful Resources

- **React Documentation:** https://react.dev
- **Express.js Guide:** https://expressjs.com
- **MongoDB Documentation:** https://docs.mongodb.com
- **Vite Guide:** https://vitejs.dev
- **JWT.io:** https://jwt.io

---

## 🎯 Next Steps

1. ✅ Application is running
2. ✅ Database is populated with sample products
3. ✅ User authentication works
4. ✅ Shopping cart is functional
5. ✅ Orders can be placed

### Ready to Deploy?

See main README.md for deployment instructions to:
- Vercel (Frontend)
- Heroku/Railway/Render (Backend)

---

**🎉 Enjoy your E-Commerce Application!**

For detailed information, see the main `README.md` file.
