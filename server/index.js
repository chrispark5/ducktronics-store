import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

// Middleware (to parse JSON requests)
app.use(express.json());
app.use(cors());
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
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
