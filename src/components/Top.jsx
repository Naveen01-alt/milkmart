import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Top.css";

const Top = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Controls mobile menu

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu after navigation
  };

  return (
    <>
      
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
      )}

      <header className="header">
        {/* Logo */}
        <div className="logo">
          <img src="/MilkyWay.jpg" alt="Milky Way Logo" />
        </div>

        {/* Hamburger button (visible on mobile only) */}
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Nav buttons */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <button className="nav-button" onClick={() => handleNav("/")}>
            Home
          </button>
          
          <button className="nav-button" onClick={() => handleNav("/products")}>
            Products
          </button>
          <button className="nav-button" onClick={() => handleNav("/cart")}>
            Cart
          </button>
          <button className="nav-button" onClick={() => handleNav("/order")}>
            My Orders
          </button>
        </nav>

        {/* Search bar */}
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="search-button">🔍</button>
        </div>
      </header>
    </>
  );
};

export default Top;
