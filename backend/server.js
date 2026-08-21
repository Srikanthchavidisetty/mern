const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// =====================================
// CORS
// =====================================
app.use((req, res, next) => {
  // Debug header
  res.setHeader("X-CORS-DEBUG", "YES");

  // Allow your Vercel frontend
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://mern-7s9f-hlbq01kc-srikanth-b5e0.vercel.app"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle browser preflight request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

// =====================================
// JSON Middleware
// =====================================
app.use(express.json());

// =====================================
// Test Route
// =====================================
app.get("/", (req, res) => {
  res.json({
    message: "Employee MERN Backend is running"
  });
});

// =====================================
// API Routes
// =====================================
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// =====================================
// MongoDB Atlas Connection
// =====================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch((error) => {
    console.error(
      "MongoDB connection error:",
      error.message
    );
  });

// =====================================
// Local Development
// =====================================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
}

// =====================================
// Export for Vercel
// =====================================
module.exports = app;