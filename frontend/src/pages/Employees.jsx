import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => setMessage(error.response?.data?.message || "Unable to load employees"));
  }, []);

  return (
    <div className="dashboard">
      <nav>
        <h2>Employee Portal</h2>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <main>
        <h1>Employees</h1>

        {message && <div className="error">{message}</div>}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee._id}</td>
                  <td>{employee.email}</td>
                  <td>₹ {Number(employee.salary).toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}