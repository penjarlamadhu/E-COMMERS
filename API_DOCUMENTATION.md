# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer {token}
```

Get token from login or register endpoints.

---

## 1. Authentication Endpoints

### Register User
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Codes:**
- 201: Success
- 400: Validation error, email already exists

---

### Login User
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Status Codes:**
- 200: Success
- 401: Invalid credentials

---

### Get Current User
**Endpoint:** `GET /auth/me`

**Authentication:** Required

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "postal": "10001",
      "country": "USA"
    }
  }
}
```

**Status Codes:**
- 200: Success
- 401: Not authenticated

---

### Update User Profile
**Endpoint:** `PUT /auth/profile`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Jane Doe",
  "phone": "+0987654321",
  "address": {
    "street": "456 Oak Ave",
    "city": "Los Angeles",
    "postal": "90001",
    "country": "USA"
  }
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "john@example.com",
    "phone": "+0987654321",
    "address": {...}
  }
}
```

---

## 2. Product Endpoints

### Get All Products
**Endpoint:** `GET /products`

**Query Parameters:**
- `category`: Filter by category (Electronics, Clothing, Books, Home, Sports, Other)
- `sort`: Sort products (price-low, price-high, newest, rating)

**Examples:**
```
GET /products
GET /products?category=Electronics
GET /products?sort=price-low
GET /products?category=Clothing&sort=rating
```

**Response:**
```json
{
  "count": 15,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones...",
      "price": 199.99,
      "image": "https://via.placeholder.com/...",
      "category": "Electronics",
      "stock": 25,
      "rating": 4.5,
      "reviews": 145,
      "createdAt": "2024-01-15T10:30:00Z"
    }
    // ... more products
  ]
}
```

**Status Codes:**
- 200: Success
- 500: Server error

---

### Get Single Product
**Endpoint:** `GET /products/{id}`

**Response:**
```json
{
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Wireless Headphones",
    "description": "High-quality wireless headphones...",
    "price": 199.99,
    "image": "https://via.placeholder.com/...",
    "category": "Electronics",
    "stock": 25,
    "rating": 4.5,
    "reviews": 145,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Status Codes:**
- 200: Success
- 404: Product not found

---

### Create Product
**Endpoint:** `POST /products`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Electronics",
  "stock": 10
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "New Product",
    // ... product details
  }
}
```

---

### Update Product
**Endpoint:** `PUT /products/{id}`

**Authentication:** Required

**Request Body:** (any fields to update)
```json
{
  "name": "Updated Product Name",
  "price": 89.99,
  "stock": 20
}
```

**Response:**
```json
{
  "message": "Product updated successfully",
  "product": {...}
}
```

---

### Delete Product
**Endpoint:** `DELETE /products/{id}`

**Authentication:** Required

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## 3. Shopping Cart Endpoints

### Get Cart
**Endpoint:** `GET /cart`

**Authentication:** Required

**Response:**
```json
{
  "cart": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439012",
        "productName": "Wireless Headphones",
        "price": 199.99,
        "quantity": 1,
        "image": "https://via.placeholder.com/..."
      }
    ],
    "totalPrice": 199.99,
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Add to Cart
**Endpoint:** `POST /cart/add`

**Authentication:** Required

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 2
}
```

**Response:**
```json
{
  "message": "Item added to cart",
  "cart": {...}
}
```

---

### Update Cart Item
**Endpoint:** `PUT /cart/update`

**Authentication:** Required

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 3
}
```

**Response:**
```json
{
  "message": "Cart updated successfully",
  "cart": {...}
}
```

---

### Remove from Cart
**Endpoint:** `DELETE /cart/remove`

**Authentication:** Required

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439012"
}
```

**Response:**
```json
{
  "message": "Item removed from cart",
  "cart": {...}
}
```

---

### Clear Cart
**Endpoint:** `DELETE /cart/clear`

**Authentication:** Required

**Response:**
```json
{
  "message": "Cart cleared successfully",
  "cart": {...}
}
```

---

## 4. Order Endpoints

### Create Order
**Endpoint:** `POST /orders/create`

**Authentication:** Required

**Request Body:**
```json
{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "postal": "10001",
    "country": "USA"
  },
  "paymentMethod": "cod"
}
```

**paymentMethod Options:**
- `cod`: Cash on Delivery
- `credit_card`: Credit Card
- `debit_card`: Debit Card
- `paypal`: PayPal

**Response:**
```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "items": [...],
    "totalPrice": 199.99,
    "status": "pending",
    "shippingAddress": {...},
    "paymentMethod": "cod",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get User Orders
**Endpoint:** `GET /orders`

**Authentication:** Required

**Response:**
```json
{
  "count": 2,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "items": [...],
      "totalPrice": 199.99,
      "status": "delivered",
      "createdAt": "2024-01-15T10:30:00Z"
    }
    // ... more orders
  ]
}
```

---

### Get Order by ID
**Endpoint:** `GET /orders/{id}`

**Authentication:** Required

**Response:**
```json
{
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "items": [...],
    "totalPrice": 199.99,
    "status": "pending",
    "shippingAddress": {...},
    "paymentMethod": "cod",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Status Codes:**
- 200: Success
- 404: Order not found
- 403: Not authorized to view this order

---

### Update Order Status
**Endpoint:** `PUT /orders/{id}/status`

**Authentication:** Required

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Status Options:**
- `pending`: Order is pending
- `processing`: Order is being processed
- `shipped`: Order has been shipped
- `delivered`: Order has been delivered
- `cancelled`: Order has been cancelled

**Response:**
```json
{
  "message": "Order status updated",
  "order": {...}
}
```

---

### Get All Orders (Admin)
**Endpoint:** `GET /orders/admin/all`

**Response:**
```json
{
  "count": 10,
  "orders": [...]
}
```

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "No token, authorization denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details..."
}
```

---

## Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new Collection
3. Add requests using examples above
4. After login/register, copy the token
5. Add to Authorization header for authenticated routes

### Environment Variables in Postman
```
baseURL: http://localhost:5000/api
token: (paste token from login response)
```

Then use: `{{baseURL}}/products` in requests

---

## Rate Limiting

Currently no rate limiting. For production, consider implementing:
- npm install express-rate-limit
- Limit: 100 requests per 15 minutes per IP

---

## CORS Configuration

The API accepts requests from:
```
http://localhost:5173 (Frontend dev server)
```

For production, update `CLIENT_URL` in `.env`

---

**Last Updated:** January 2024
