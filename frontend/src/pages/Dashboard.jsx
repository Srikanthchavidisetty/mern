import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const employee = JSON.parse(localStorage.getItem("employee") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employee");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <nav>
        <h2>Employee Portal</h2>
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/employees">Employees</Link>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      </nav>

      <main>
        <h1>Welcome 👋</h1>
        <div className="dashboard-grid">
          <div className="info-card">
            <span>Email</span>
            <strong>{employee.email}</strong>
          </div>
          <div className="info-card">
            <span>Salary</span>
            <strong>₹ {Number(employee.salary || 0).toLocaleString("en-IN")}</strong>
          </div>
        </div>
      </main>
    </div>
  );
}