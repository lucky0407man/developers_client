import { Link } from "react-router-dom";
import type { NavbarProps } from "../../types";
import "../../css/Navbar.css";

const Navbar = ({ activeKey, onChange }: NavbarProps) => {
  return (
    <header 
      style={{
        position: "sticky",
        top: 0,
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "var(--navbar-bg)",
        color: "var(--text-primary)",
        borderBottom: "1px solid var(--border-color)",
        zIndex: 1000,
        flexShrink: 0,
        transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div 
        style={{ display: "flex", gap: "20px" }}
      >
        <Link to="/" style={{ color: "var(--text-primary)", textDecoration: "none", fontWeight: "500" }}>Home</Link>
        <Link to="/profile" style={{ color: "var(--text-primary)", textDecoration: "none", fontWeight: "500" }}>Profiles</Link> 
        <Link to="/docs" style={{ color: "var(--text-primary)", textDecoration: "none", fontWeight: "500" }}>Docs</Link> 
        <Link to="/about" style={{ color: "var(--text-primary)", textDecoration: "none", fontWeight: "500" }}>About</Link>
        <Link to="/users" style={{ color: "var(--text-primary)", textDecoration: "none", fontWeight: "500" }}>Users</Link>
      </div>
    </header>
  );
};

export default Navbar;
