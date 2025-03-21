import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;
const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Secret key for JWT

// Middleware (to parse JSON requests)
app.use(express.json());
app.use(cors());

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Access Denied: No Token Provided");

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send("Invalid Token");
    req.user = user; // Attach user info to the request
    next();
  });
};
// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const product = await collection.findOne({ id: parseInt(id) });
    console.log(product);
    res.json(product);
  } catch (e) {
    console.log(e);
  }
});

app.get("/products/:category", async (req, res) => {
  try {
    const { category } = req.params;
    console.log(category);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const products = await collection
      .find({
        category: { $regex: new RegExp(category, "i") },
      })
      .toArray();
    console.log(products);
    res.json(products);
  } catch (e) {
    console.log(e);
  }
});

app.post("/order", async (req, res) => {
  // Save the product to the database
  try {
    const product = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("orders");
    const result = await collection.insertOne(product);
    res.status(201).send(`Order added to database: ${result.insertedId}`);
  } catch (e) {
    console.log(e);
  }
});

app.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const products = await collection
      .find({
        $text: { $search: q },
      })
      .toArray();
    console.log(products);
    res.json(products);
  } catch (e) {
    console.log(e);
  }
});

//Hero Parallax Route
app.get("/heroparallax", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Generate 16 unique random numbers between 1 and 1000
    const randomIds = new Set();
    while (randomIds.size < 16) {
      const randomId = Math.floor(Math.random() * 1000) + 1;
      randomIds.add(randomId);
    }

    // Convert Set to Array
    const randomIdArray = Array.from(randomIds);

    // Query the database for documents with these random IDs
    const products = await collection
      .find({ id: { $in: randomIdArray } })
      .toArray();

    // Send the products as a JSON response
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while retrieving data.");
  }
});

// Wishlist endpoint (authenticated)
app.get("/wishlist", authenticateToken, async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("wishlist");

    // Fetch wishlist items for the authenticated user
    const wishlistItems = await collection
      .find({ userId: req.user.id })
      .toArray();
    res.json(wishlistItems);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while retrieving the wishlist.");
  }
});

// Add item to wishlist (authenticated)
app.post("/wishlist", authenticateToken, async (req, res) => {
  try {
    const product = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("wishlist");

    // Add the product to the user's wishlist
    const result = await collection.insertOne({
      userId: req.user.id,
      product,
    });
    res.status(201).send(`Wishlist item added: ${result.insertedId}`);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while adding to the wishlist.");
  }
});

// Remove item from wishlist (authenticated)
app.delete("/wishlist/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("wishlist");

    // Remove the product from the user's wishlist
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: req.user.id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).send("Item not found in wishlist.");
    }

    res.send("Wishlist item removed successfully.");
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while removing the wishlist item.");
  }
});

app.get("/wishlist/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("wishlist");
    console.log(id, "THIS IS THE ID PASSED IN ");
    const item = await collection.findOne({
      "product._id": id,
      userId: req.user.id,
    });

    if (item) {
      res.json({ exists: true });
      console.log("Exists");
    } else {
      res.json({ exists: false });
      console.log("doesn't exist");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while checking the wishlist item.");
  }
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("users");

    // Check if the username or email already exists
    const existingUser = await collection.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).send("Username or email already exists.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await collection.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).send(`User registered successfully: ${result.insertedId}`);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while registering the user.");
  }
});
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required.");
  }

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("users");

    // Find the user by username or email
    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(401).send("Invalid username or password.");
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid username or password.");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while logging in.");
  }
});
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("users");

    // Fetch the user from the database using the user ID from the JWT
    const user = await collection.findOne({ _id: new ObjectId(req.user.id) });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.json({
      username: user.username,
      email: user.email,
      ...(user.address && {
        address: {
          addressLine1: user.address.addressLine1,
          addressLine2: user.address.addressLine2,
          city: user.address.city,
          state: user.address.state,
          zipCode: user.address.zipCode,
        },
      }),
      ...(user.creditCardInfo && {
        creditCardInfo: {
          cardNumber: user.creditCardInfo.cardNumber,
          cvv: user.creditCardInfo.cvv,
          expiryDate: user.creditCardInfo.expiryDate,
        },
      }),
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while retrieving the profile.");
  }
});
app.post("/profile/update", authenticateToken, async (req, res) => {
  const { address, creditCardInfo } = req.body;

  if (!address || !creditCardInfo) {
    return res
      .status(400)
      .send("Address and credit card information are required.");
  }

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("users");

    // Update the user's document with address and credit card information
    const result = await collection.updateOne(
      { _id: new ObjectId(req.user.id) }, // Find the user by their ID from the JWT
      {
        $set: {
          address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
          },
          creditCardInfo: {
            cardNumber: creditCardInfo.cardNumber,
            cvv: creditCardInfo.cvv,
            expiryDate: creditCardInfo.expiryDate,
          },
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send("Profile updated successfully.");
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while updating the profile.");
  }
});
// Save or Update Cart Items
app.post("/cart", authenticateToken, async (req, res) => {
  const { cartItems } = req.body;

  if (!cartItems || !Array.isArray(cartItems)) {
    return res.status(400).send("Invalid cart items.");
  }

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("carts");

    // Upsert the user's cart (insert if it doesn't exist, update if it does)
    const result = await collection.updateOne(
      { userId: req.user.id }, // Match by userId
      { $set: { cartItems } }, // Update the cart items
      { upsert: true } // Insert if it doesn't exist
    );

    res.status(200).send("Cart updated successfully.");
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while updating the cart.");
  }
});

// Fetch Cart Items
app.get("/cart", authenticateToken, async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("carts");

    // Find the user's cart by userId
    const cart = await collection.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).send("Cart not found.");
    }

    res.json(cart.cartItems);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while fetching the cart.");
  }
});

// Add a review for a product
app.post("/product/:id/review", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!comment) {
    return res.status(400).send("Rating and comment are required.");
  }

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("reviews");

    const review = {
      productId: id,
      userId: req.user.id,
      username: req.user.username, // Assuming username is in the JWT payload
      rating,
      comment,
      createdAt: new Date(),
    };

    await collection.insertOne(review);
    res.status(201).send(review);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while adding the review.");
  }
});

// Get reviews for a product
app.get("/product/:id/reviews", async (req, res) => {
  const { id } = req.params;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection("reviews");

    const reviews = await collection.find({ productId: id }).toArray();
    res.json(reviews);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while fetching reviews.");
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
