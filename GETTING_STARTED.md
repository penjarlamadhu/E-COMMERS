# 🚀 Getting Started Checklist

Complete this checklist to get your e-commerce application running!

---

## ✅ Pre-Installation Checklist

### Prerequisites
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed or MongoDB Atlas account created
- [ ] npm or yarn ready
- [ ] Code editor (VS Code recommended) installed
- [ ] Terminal/PowerShell ready

### Software Versions
Check with:
```bash
node --version    # Should be v14+
npm --version     # Should be v6+
```

---

## 📦 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd server
```
- [ ] Successfully navigated to server folder

### Step 2: Install Dependencies
```bash
npm install
```
- [ ] Installation completed without errors
- [ ] node_modules folder created
- [ ] package-lock.json file generated

### Step 3: Create Environment File
```bash
cp .env.example .env
```
- [ ] .env file created in server folder

### Step 4: Update .env File
Edit and update the following in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
JWT_SECRET=your_super_secret_key
```
- [ ] MONGODB_URI configured
- [ ] PORT set to 5000
- [ ] JWT_SECRET set
- [ ] CLIENT_URL set to http://localhost:5173

### Step 5: Start MongoDB Service
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```
- [ ] MongoDB service running
- [ ] No connection errors in terminal

### Step 6: Start Backend Server
```bash
npm start
```
- [ ] Backend server started successfully
- [ ] Message shows "MongoDB Connected"
- [ ] Message shows "Server running on port 5000"

### Step 7: Verify Backend
Open browser: http://localhost:5000/api/health
- [ ] Response shows: {"message":"Server is running"}
- [ ] No CORS errors in console

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory (New Terminal)
```bash
cd client
```
- [ ] Successfully navigated to client folder

### Step 2: Install Dependencies
```bash
npm install
```
- [ ] Installation completed
- [ ] node_modules folder created
- [ ] package-lock.json generated

### Step 3: Start Frontend Server
```bash
npm run dev
```
- [ ] Front-end server started
- [ ] Message shows "Local: http://localhost:5173"
- [ ] No build errors

### Step 4: Verify Frontend
Open browser: http://localhost:5173
- [ ] Homepage loads successfully
- [ ] Navbar displays correctly
- [ ] No console errors
- [ ] All images load (placeholders work)

---

## 📊 Database Setup

### Step 1: Populate Sample Data
```bash
cd server
node seed.js
```
- [ ] Script runs without errors
- [ ] Console shows "✅ Successfully seeded 15 products!"
- [ ] Completion message displays

### Step 2: Verify Database
- [ ] Open MongoDB (Mongo shell or MongoDB Atlas)
- [ ] Check database: `use ecommerce`
- [ ] Check collections: `show collections`
- [ ] [ ] Should see: products, users, orders, carts

### Step 3: Verify Sample Products
In terminal, check MongoDB:
```bash
db.products.find().count()
```
- [ ] Should show: 15

---

## 🧪 Application Testing

### Test 1: User Registration
- [ ] Navigate to http://localhost:5173/register
- [ ] Fill in the registration form:
  - [ ] Name: "Test User"
  - [ ] Email: "test@example.com"
  - [ ] Password: "password123"
  - [ ] Confirm Password: "password123"
- [ ] Click Register button
- [ ] Success message appears
- [ ] Redirected to home page
- [ ] User is logged in (check navbar)

### Test 2: User Login
- [ ] Logout first (click logout in navbar)
- [ ] Navigate to http://localhost:5173/login
- [ ] Enter your credentials:
  - [ ] Email: "test@example.com"
  - [ ] Password: "password123"
- [ ] Click Login button
- [ ] Success message appears
- [ ] Logged in successfully

### Test 3: Browse Products
- [ ] Homepage shows featured products
- [ ] products page (http://localhost:5173/products) loads
- [ ] All 15 products display
- [ ] Filter by category works
- [ ] Sort dropdown works
- [ ] Product cards show images, prices, ratings

### Test 4: Product Details
- [ ] Click on any product
- [ ] Product detail page loads
- [ ] Product image displays
- [ ] Description shows correctly
- [ ] Stock status displays
- [ ] Rating shows

### Test 5: Shopping Cart
- [ ] From any product, choose quantity
- [ ] Click "Add to Cart"
- [ ] Success message appears
- [ ] Cart counter updates in navbar
- [ ] Navigate to http://localhost:5173/cart
- [ ] Product appears in cart
- [ ] Cart total calculates correctly
- [ ] Quantity can be updated
- [ ] Items can be removed

### Test 6: Checkout
- [ ] From cart, click "Proceed to Checkout"
- [ ] Redirected to checkout page
- [ ] Shipping address form appears
- [ ] Fill in address:
  - [ ] Street: "123 Main St"
  - [ ] City: "New York"
  - [ ] Postal: "10001"
  - [ ] Country: "USA"
- [ ] Select payment method (Cash on Delivery)
- [ ] Click "Place Order"
- [ ] Success message appears
- [ ] Cart clears

### Test 7: Order History
- [ ] Navigate to http://localhost:5173/orders
- [ ] Your order appears in the list
- [ ] Click "View Details"
- [ ] Order details display correctly:
  - [ ] Order ID shows
  - [ ] Items display with prices
  - [ ] Shipping address shows
  - [ ] Total price correct

### Test 8: Account Management
- [ ] Navigate to http://localhost:5173/account
- [ ] Your profile information displays
- [ ] Click "Edit Profile"
- [ ] Update some information:
  - [ ] Phone number: "+1234567890"
- [ ] Click "Save Profile"
- [ ] Success message appears
- [ ] Changes are saved

### Test 9: Mobile Responsiveness
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test on mobile (375px width)
- [ ] All elements display correctly
- [ ] Navigation works on mobile
- [ ] Forms are usable
- [ ] Images scale properly

### Test 10: Error Handling
- [ ] Try registering with duplicate email
- [ ] [ ] Error message appears
- [ ] Try logging in with wrong password
- [ ] [ ] Error message appears
- [ ] Try accessing protected pages without login
- [ ] [ ] Redirected to login

---

## 🔍 Final Verification

### Check Backend Terminal
```
✓ MongoDB Connected: localhost
✓ Server running on port 5000
```
- [ ] Both messages visible

### Check Frontend Terminal
```
✓ Local: http://localhost:5173
```
- [ ] Server running without errors

### Check Browser Console
- [ ] No red errors
- [ ] Only warnings (if any) are acceptable

### Check Browser Network Tab
- [ ] All API calls to localhost:5000 succeed
- [ ] Status codes are 200, 201, or 404
- [ ] No 500 errors

### Test All Pages
- [ ] Home page: ✓
- [ ] Products page: ✓
- [ ] Product detail: ✓
- [ ] Cart page: ✓
- [ ] Checkout page: ✓
- [ ] Orders page: ✓
- [ ] Account page: ✓
- [ ] Login page: ✓
- [ ] Register page: ✓

---

## 📝 Environment Files

### Backend .env Checklist
- [ ] MONGODB_URI is set
- [ ] PORT is 5000
- [ ] JWT_SECRET is set
- [ ] CLIENT_URL is http://localhost:5173
- [ ] NODE_ENV is development

### Frontend Setup
- [ ] No .env file needed
- [ ] Uses default API URL (http://localhost:5000)

---

## 🎯 Custom Testing Scenarios

### Scenario 1: Multiple Products in Cart
- [ ] Add 3 different products to cart
- [ ] Checkout with all items
- [ ] Verify order shows all 3 items
- [ ] [ ] Total price is correct

### Scenario 2: Update Product Quantity
- [ ] Add product to cart
- [ ] Go to cart page
- [ ] Update quantity to 5
- [ ] [ ] Price updates automatically
- [ ] [ ] Total calculates correctly

### Scenario 3: Category Filtering
- [ ] Go to products page
- [ ] Select "Electronics" category
- [ ] [ ] Only electronics show
- [ ] Select "Clothing" category
- [ ] [ ] Products change to clothing items

### Scenario 4: Price Sorting
- [ ] Go to products page
- [ ] Sort by "Price: Low to High"
- [ ] [ ] Prices go from low to high
- [ ] Sort by "Price: High to Low"
- [ ] [ ] Prices go from high to low

### Scenario 5: Update Profile with Address
- [ ] Go to account page
- [ ] Edit profile
- [ ] Add complete address:
  - [ ] Street: "456 Oak Ave"
  - [ ] City: "Los Angeles"
  - [ ] Postal: "90001"
  - [ ] Country: "USA"
- [ ] Save profile
- [ ] Go to checkout
- [ ] [ ] Address pre-fills correctly

---

## 🚨 Troubleshooting Checklist

### If Backend Doesn't Start
- [ ] MongoDB service is running
- [ ] Check MONGODB_URI in .env
- [ ] Check PORT 5000 is not in use
- [ ] Check all dependencies installed
- [ ] Try: `npm install` again

### If Frontend Doesn't Load
- [ ] Check if dev server is running
- [ ] Port 5173 is not blocked
- [ ] Clear browser cache
- [ ] Check console for errors
- [ ] Try: `npm install` again

### If Database Connection Fails
- [ ] MongoDB service is running
- [ ] MONGODB_URI is correct
- [ ] MongoDB is accessible
- [ ] Try connecting manually with mongo shell

### If API Calls Fail
- [ ] Backend server is running
- [ ] CORS error in console?
- [ ] Check .env CLIENT_URL
- [ ] Restart backend server
- [ ] Check network tab for response

### If Seed Script Fails
- [ ] MongoDB is running
- [ ] Database models are created
- [ ] Check: `cd server` before running
- [ ] Run: `node seed.js`

---

## ✨ Success Indicators

You're all set when:

- [x] Backend starts without errors
- [x] Frontend loads in browser
- [x] 15 sample products load
- [x] Can register new user
- [x] Can login with credentials
- [x] Can browse products
- [x] Can add to cart
- [x] Can checkout
- [x] Can view orders
- [x] Can manage account
- [x] Mobile works responsively
- [x] No console errors

---

## 📚 Next Steps

Once everything is working:

1. **Explore the Code**
   - Read through React components
   - Check Express routes
   - Understand MongoDB models

2. **Customize**
   - Change colors/branding
   - Add new features
   - Modify product categories

3. **Deploy**
   - Push to GitHub
   - Deploy frontend (Vercel/Netlify)
   - Deploy backend (Heroku/Railway)

4. **Scale**
   - Add more features
   - Improve performance
   - Add admin dashboard

---

## 📞 Need Help?

Refer to:
- **Setup Issues:** QUICKSTART.md
- **API Questions:** API_DOCUMENTATION.md
- **Feature Info:** PROJECT_FEATURES.md
- **General Help:** README.md

---

## 🎉 You're Ready!

Once all checkboxes are complete, your e-commerce application is ready for development or deployment!

**Congratulations! 🚀**

---

**Last Updated:** January 2024
**Status:** ✅ Ready for Use
