const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware (to parse JSON requests)
app.use(express.json());

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
