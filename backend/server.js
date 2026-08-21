const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

// ==============================
// CORS
// ==============================
app.use(
  cors({
    origin:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ==============================
// Middleware
// ==============================
app.use(express.json());

// ==============================
// Test route
// ==============================
app.get("/", (req, res) => {
  res.json({
    message: "Employee MERN Backend is running",
  });
});

// ==============================
// API routes
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
    console.error("MongoDB connection error:", error.message);
  });

// ==============================
// Local development only
// ==============================
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// ==============================
// Export for Vercel
// ==============================
module.exports = app;