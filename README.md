# E-Commerce Website - Complete Full-Stack Application

A production-ready e-commerce website built with **React**, **Node.js**, **Express**, and **MongoDB**. This project includes user authentication, product management, shopping cart, and order processing.

## 🚀 Features

### Frontend (React + Vite)
- ✅ Responsive mobile-first design
- ✅ Product listing and filtering
- ✅ Product detail page with images
- ✅ Shopping cart management
- ✅ Checkout process
- ✅ User authentication (Login/Register)
- ✅ Order history
- ✅ User account management
- ✅ Loading states and error handling
- ✅ Professional UI with CSS Grid/Flexbox

### Backend (Node.js + Express)
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Product CRUD operations
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ User profile management
- ✅ CORS enabled for frontend-backend communication

## 📁 Project Structure

```
E-COMMERS/
├── server/                 # Backend (Node.js + Express)
│   ├── models/            # Database models (User, Product, Order, Cart)
│   ├── routes/            # API routes (auth, products, cart, orders)
│   ├── controllers/       # Route logic
│   ├── middleware/        # Authentication middleware
│   ├── config/            # Database configuration
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   ├── .env.example       # Environment variables template
│   └── .gitignore
│
└── client/                 # Frontend (React + Vite)
    ├── src/
    │   ├── components/    # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── Loading.jsx
    │   │   ├── Error.jsx
    │   │   └── Success.jsx
    │   ├── pages/         # Page components
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Orders.jsx
    │   │   └── Account.jsx
    │   ├── context/       # React Context (Auth, Cart)
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── services/      # API service calls
    │   │   └── api.js
    │   ├── styles/        # CSS files for all components
    │   ├── App.jsx        # Main App component
    │   ├── main.jsx       # React entry point
    │   └── index.css      # Global styles
    ├── index.html         # HTML template
    ├── vite.config.js     # Vite configuration
    ├── package.json       # Frontend dependencies
    └── .gitignore
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download Community Edition](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager

### 1. Clone/Download Project

```bash
cd E-COMMERS
```

## 📦 Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the server directory:

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/ecommerce

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Get connection string and update `MONGODB_URI` in `.env`

### Step 4: Start Backend Server

```bash
# From server directory
npm start
# or for development with auto-reload
npm run dev
```

The server will start on: **http://localhost:5000**

You can test the API with: **http://localhost:5000/api/health**

## 🎨 Frontend Setup

### Step 1: Install Frontend Dependencies

```bash
cd client
npm install
```

### Step 2: Start Frontend Development Server

```bash
# From client directory
npm run dev
```

The frontend will start on: **http://localhost:5173**

## 🔐 API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user (requires token)
- **PUT** `/api/auth/profile` - Update user profile (requires token)

### Products
- **GET** `/api/products` - Get all products (supports filtering & sorting)
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create product (requires token)
- **PUT** `/api/products/:id` - Update product (requires token)
- **DELETE** `/api/products/:id` - Delete product (requires token)

### Shopping Cart
- **GET** `/api/cart` - Get user's cart (requires token)
- **POST** `/api/cart/add` - Add item to cart (requires token)
- **PUT** `/api/cart/update` - Update cart item quantity (requires token)
- **DELETE** `/api/cart/remove` - Remove item from cart (requires token)
- **DELETE** `/api/cart/clear` - Clear entire cart (requires token)

### Orders
- **POST** `/api/orders/create` - Create new order (requires token)
- **GET** `/api/orders` - Get user's orders (requires token)
- **GET** `/api/orders/:id` - Get order by ID (requires token)
- **PUT** `/api/orders/:id/status` - Update order status (requires token)
- **GET** `/api/orders/admin/all` - Get all orders (admin)

## 💾 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    postal: String,
    country: String
  },
  createdAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String (URL),
  category: String (Electronics, Clothing, Books, Home, Sports, Other),
  stock: Number,
  rating: Number,
  reviews: Number,
  createdAt: Date
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId,
    productName: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalPrice: Number,
  status: String (pending, processing, shipped, delivered, cancelled),
  shippingAddress: {
    street: String,
    city: String,
    postal: String,
    country: String
  },
  paymentMethod: String (credit_card, debit_card, paypal, cod),
  createdAt: Date
}
```

### Cart Model
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId,
    productName: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  totalPrice: Number,
  updatedAt: Date
}
```

## 🧪 Testing the Application

### Create Test Products

Use a REST client (Postman, Insomnia, or VS Code REST Client) to create products:

```bash
POST http://localhost:5000/api/products
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop for professionals",
  "price": 999.99,
  "category": "Electronics",
  "stock": 15,
  "image": "https://via.placeholder.com/500x500?text=Laptop",
  "rating": 4.5,
  "reviews": 120
}
```

### Test Flow
1. **Register** at http://localhost:5173/register
2. **Login** at http://localhost:5173/login
3. **Browse Products** at http://localhost:5173/products
4. **Add to Cart** - Click product, select quantity, add to cart
5. **View Cart** at http://localhost:5173/cart
6. **Checkout** at http://localhost:5173/checkout
7. **View Orders** at http://localhost:5173/orders
8. **Manage Account** at http://localhost:5173/account

## 🔧 Development Tips

### Hot Module Replacement
Both backend and frontend support hot reload:
- **Backend**: Uses `nodemon` (already configured)
- **Frontend**: Vite provides instant reload

### Debug Backend
```bash
# Add NODE_ENV=development for detailed logs
NODE_ENV=development npm run dev
```

### API Testing
Use tools like:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [VS Code REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

## 📱 Responsive Design

The application is fully responsive and tested on:
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (768x1024, 834x1112)
- ✅ Mobile (375x667, 414x896)

## 🚀 Deployment Ready

### Frontend Deployment (Vercel, Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Heroku, Railway, Render)
```bash
# Push to Git repository
git add .
git commit -m "Initial commit"
git push origin main
```

Configure environment variables on deployment platform and deploy!

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Protected routes
- ✅ CORS configuration
- ✅ Input validation
- ✅ Error handling

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB service is running
```bash
# Windows: Start MongoDB Service
net start MongoDB

# macOS: Start with Homebrew
brew services start mongodb-community

# Linux: Start MongoDB Service
sudo systemctl start mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in `.env` or kill the process using the port
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### CORS Errors
Ensure `CLIENT_URL` in `.env` matches your frontend URL

### Clear Cache
```bash
# Frontend
rm -rf client/node_modules client/dist
npm install

# Backend
rm -rf server/node_modules
npm install
```

## 📚 Technologies Used

**Frontend:**
- React 18.2
- Vite 4.3
- React Router DOM 6
- Axios
- CSS3 (Grid, Flexbox)

**Backend:**
- Node.js
- Express.js 4.18
- MongoDB
- Mongoose 7
- JWT
- bcryptjs

**Tools:**
- npm/yarn
- Git
- REST APIs

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a complete production-ready e-commerce platform.

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Set up MongoDB
3. ✅ Configure environment variables
4. ✅ Start backend server
5. ✅ Start frontend server
6. ✅ Create test products
7. ✅ Test the application
8. ✅ Deploy to production

**Happy Coding! 🚀**
