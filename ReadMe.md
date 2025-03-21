# 🦆 Ducktronics Store

Ducktronics Store is an e-commerce tech platform built with **Next.js**, **Express**, **MongoDB**, and **JWT authentication**. It also incorporates **bcrypt hashing** for password security and a **scikit-learn KNN model** for recommendations.

## 🚀 Tech Stack

- **Frontend:** Next.js 🦆
- **Backend:** Express.js 🛠️
- **Database:** MongoDB 🗄️
- **Authentication:** JWT with bcrypt hashing & salting 🔐
- **State Management:** Zustand 🧠
- **UI Libraries:** Aceternity UI, Material UI, Tailwind CSS, React Bits 🎨
- **Machine Learning:** scikit-learn KNN model 🤖

## 🦆 Features

✅ **Secure JWT authentication** for safe transactions  
✅ **Fast and responsive UI** powered by Tailwind & Material UI  
✅ **Machine Learning recommendations** using KNN  
✅ **Duck-themed tech shopping experience** 🛒  
✅ **Built in just 2.5 days!** ⏳🔥

## 📌 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ducktronics-store.git
cd ducktronics-store
```

### 2️⃣ Configure Environment Variables

in the server folder, create a .env file and include

```bash
MONGO_DB_URL = 'mongodb://localhost:27017'
MONGO_DB = 'online_store'
MONGO_DB_COLLECTION = 'products'

# Set your own secret key for JWT authentication
JWT_SECRET = 'your_secret_key_here'
```

### 3️⃣ Install Dependencies

Run the following in both the Nextjs and Server folders

```bash
npm install
```

### 4️⃣ Run the Application

Start the backend server:

```bash
cd server
npm run start
```

Start the frontend:

```bash
cd ../nextjs
npm run dev
```

Start the flask server:

```bash
cd ../python
python app.py
```

The frontend should now be running at http://localhost:3000 🚀

🔐 Authentication

• Uses JWT tokens for user authentication.
• Passwords are securely hashed & salted with bcrypt.

🤖 Machine Learning Model

• Implements a KNN-based recommendation system using scikit-learn.
• Helps suggest similar products to users based on past purchases.

### 📷 Screenshots

### Home Page

![Home Page](/nextjs/public/images/readme/homepage.png)

### Product Details

![Product Details](/nextjs/public/images/readme/item.png)

### Cart

![cart](/nextjs/public/images/readme/cart.png)

### 404 Page

![404](/nextjs/public/images/readme/duckhunt.png)
