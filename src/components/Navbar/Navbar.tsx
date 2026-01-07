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
        background: "#333",
        color: "#fff",
        zIndex: 1000,
        flexShrink: 0,
      }}
    >
      <div 
        style={{ display: "flex", gap: "20px" }}
      >
        <Link to="/" >Home</Link>
        <Link to="/profile">Profiles</Link> 
        <Link to="/docs">Docs</Link> 
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </div>
    </header>
  );
};

export default Navbar;
