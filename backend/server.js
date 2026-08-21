const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

const corsOptions = {
  origin: "https://mern-7s9f.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Explicitly handle browser preflight requests
app.options(/.*/, cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Employee MERN Backend is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;