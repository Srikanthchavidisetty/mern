const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, salary } = req.body;

    if (!email || !password || salary === undefined) {
      return res.status(400).json({ message: "Email, password and salary are required" });
    }

    const existing = await Employee.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      salary: Number(salary)
    });

    res.status(201).json({
      message: "Registration successful",
      employee: {
        id: employee._id,
        email: employee.email,
        salary: employee.salary
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email: email?.toLowerCase() });
    if (!employee) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, employee.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: employee._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        email: employee.email,
        salary: employee.salary
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;