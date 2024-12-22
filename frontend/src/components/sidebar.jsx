import { Link } from "react-router-dom";
import "../style/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">LifePod</h1>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link">
          Dashboard
        </Link>
        <Link to="/dashboard/history" className="sidebar-link">
          History
        </Link>
        <Link to="/dashboard/settings" className="sidebar-link">
          Settings
        </Link>
      </nav>
      <div className="sidebar-footer">
        <Link to="/logout" className="sidebar-link logout">
          Logout
        </Link>
      </div>
    </div>
  );
}
