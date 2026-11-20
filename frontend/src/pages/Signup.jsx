
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    salary: ""
  });

  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Only .com email addresses allowed
    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/i;

    if (!emailPattern.test(form.email.trim())) {
      setMessage("Please enter a valid .com email address");
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password must contain at least 6 characters");
      return;
    }

    if (form.salary === "" || Number(form.salary) < 0) {
      setMessage("Please enter a valid salary");
      return;
    }

    try {
      const employeeData = {
        email: form.email.trim().toLowerCase(),
        password: form.password,
        salary: Number(form.salary)
      };

      await api.post("/auth/signup", employeeData);

      navigate("/login", {
        state: {
          message: "Registration successful. Please login."
        }
      });

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="page">
      <div className="card">

        <h1>Create Account</h1>
        <p className="subtitle">
          Register your employee account
        </p>

        {message && (
          <div className="error">{message}</div>
        )}

        <form onSubmit={submit}>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            minLength={6}
            required
          />

          <label>Salary</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter your salary"
            value={form.salary}
            onChange={(e) =>
              setForm({ ...form, salary: e.target.value })
            }
            required
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="footer-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}
