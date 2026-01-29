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

### 4️⃣ Populate the Database

Before running the app, you must populate MongoDB with product data.

Open the Jupyter notebook "data_handler.ipynb" and run all cells in the notebook

### 5️⃣ Run the Application

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

• Uses JWT tokens for user authentication
• Passwords are hashed & salted with bcrypt
• Tokens are stored client-side for simplicity

⚠️ This implementation is not production-safe and exists purely for demonstration purposes.

🤖 Machine Learning Model

• Implements a KNN-based recommendation system using scikit-learn.
• Helps suggest similar products to users based on past purchases.

# 🔍 Security & Threat Analysis

This document outlines the **known security risks and architectural weaknesses** identified during threat modeling of the Ducktronics Store project.

> ⚠️ **Disclaimer**  
> Ducktronics Store is a **proof-of-concept / learning project** and is **not intended for real use**.  
> The issues listed below are **known, acknowledged, and intentionally left unresolved** to demonstrate security awareness and common early-stage tradeoffs.

---

## 🧠 Threat Modeling Summary

Threat modeling revealed multiple risks across authentication, session management, data handling, and API protection. These risks would need to be addressed before any real-world deployment.

---

## 🔐 Authentication & Session Management Issues

- ❌ **JWTs stored in `localStorage`**
  - Vulnerable to XSS attacks
  - No protection against token theft via malicious scripts

- ❌ **No refresh token strategy**
  - Long-lived tokens increase blast radius if compromised
  - No session rotation or revocation

- ❌ **No secure cookie usage**
  - JWTs are not stored using `HttpOnly`, `Secure`, or `SameSite` flags

---

## 🚦 API & Backend Security Gaps

- ❌ **No rate limiting**
  - APIs are vulnerable to brute-force and DoS attacks

- ❌ **No authentication required on some routes**
  - CRUD operations can be accessed without proper authorization

- ❌ **No role-based access control (RBAC)**
  - All authenticated users have equivalent permissions

- ❌ **No request throttling or abuse detection**

---

## 🧾 Data Handling & PII Risks

- ❌ **Fake credit card and address data stored in plaintext**
  - No encryption at rest
  - No field-level encryption for sensitive data

- ❌ **No compliance with PCI, GDPR, or related standards**
  - Data handling is intentionally simplified for demo purposes

> ⚠️ **Do not enter real personal or payment data**

---

## 🧪 Why These Issues Exist

These vulnerabilities exist **by design** to:

- Demonstrate common security pitfalls in early-stage applications
- Support threat modeling and security analysis exercises
- Emphasize the difference between demo-level and production-ready systems
- Prioritize feature development under strict time constraints (2.5 days)

## **Ducktronics Store should never be used with real user data.**

### 📷 Screenshots

### Home Page

![Home Page](/nextjs/public/images/readme/homepage.png)

### Product Details

![Product Details](/nextjs/public/images/readme/item.png)

### Cart

![cart](/nextjs/public/images/readme/cart.png)

### 404 Page

![404](/nextjs/public/images/readme/duckhunt.png)
