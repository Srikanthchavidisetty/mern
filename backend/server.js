const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// ==============================
// CORS
// ==============================
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

// ==============================
// JSON
// ==============================
app.use(express.json());

// ==============================
// Test route
// ==============================
app.get("/", (req, res) => {
  res.json({
    message: "Employee MERN Backend is running"
  });
});

// ==============================
// Routes
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// ==============================
// MongoDB Atlas
// ==============================
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

// ==============================
// Local development
// ==============================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
}

// ==============================
// Vercel
// ==============================
module.exports = app;