import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";

const IntroPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Welcome to MilkMart";
  }, []);

  const handleGo = () => {
    navigate("products"); // 👈 Replace with your actual main route
  };

  return (
    <div className="intro-container">
      <div className="intro-box">
        <h1 className="intro-title">🥛 Welcome to MilkMart</h1>
        <p className="intro-text">
          MilkMart makes your daily milk needs effortless. Simply browse products, add to cart, enter delivery details, and confirm your order. You’ll get an email confirmation, and your milk will be delivered to your doorstep — fresh and on time!
        </p>
        <button className="go-button" onClick={handleGo}>
          Go to Main Page →
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
