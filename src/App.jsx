import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Top from "./components/Top";
import Flexi from "./components/Flexi";
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import Footer from "./components/Footer";
import IntroPage from "./components/IntroPage";

// Wrapper to use useLocation properly
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Logic to hide Top only on the homepage
  const isHomePage = location.pathname === "/";
  const isProductsPage = location.pathname === "/products";
  


  return (
    <>
      {!isHomePage && <Top />}
        {isHomePage && <Flexi />}
      {isProductsPage && <Flexi />}
      

      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
      </Routes>

      <Footer />
    </>
  );
}

export default AppWrapper;
