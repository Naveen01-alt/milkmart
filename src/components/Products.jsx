import React from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = ({ addToCart }) => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Fresh Cow Milk",
      price: 50,
      image: "/milk.jpg", 
      description: "Pure and fresh cow milk, directly from farms.",
    },
    {
      id: 2,
      name: "Organic Buffalo Milk",
      price: 60,
      image: "/buffalo.jpg",
      description: "Rich and creamy organic buffalo milk.",
    },
    {
      id: 3,
      name: "Almond Milk",
      price: 120,
      image: "/almond.jpg",
      description: "Healthy and dairy-free almond milk alternative.",
    },
    {
      id: 4,
      name: "Flavored Milk",
      price: 30,
      image: "/flavored.jpg",
      description: "Tasty flavored milk available in chocolate, strawberry, and vanilla.",
    },
    {
      id: 5,
      name: "Amul Taaza Pouch,500ml",
      price: 28,
      image: "/amul.jpg",
      description: " flavorFreshed milk free delivery starting from today 7pm-9pm.",
    },
    {
      id: 6,
      name: "Heritage toned Milk-pasteurised 500ml pack",
      price: 30,
      image: "/heritage.jpg",
      description: "flavorFreshed milk free delivery starting from today 7pm-9pm.",
    },
    {
      id: 7,
      name: "Godrej Jersey Homogenized Toned Milk,500ml",
      price: 29,
      image: "/flavored.jpg",
      description: "Toned milk free delivery starting from today 7pm-9pm.",
    },
    {
      id: 8,
      name: "Heritage toned Milk-pasteurised 500ml pack",
      price: 30,
      image: "/toned.jpg",
      description: "flavorFreshed milk free delivery starting from today 7pm-9pm.",
    },
    {
      id: 9,
      name: "Jersey Full cream Milk,500ml MI Fino Pouch,liquid",
      price: 39,
      image: "/cream.jpg",
      description: "flavorFreshed milk free delivery starting from today 7pm-9pm.",
    },
    {
      id: 10,
      name: "Safaa Evaporated Milk Mixed With Vegetable fat,Ready To Use,410gm(From UAE)",
      price: 399,
      image: "/safa.jpg",
      description: "flavorFreshed milk free delivery starting from today 7pm-9pm.",
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product); 
    navigate("/cart"); 
  };

  return (
    <div className="products-container">
      <h2>Available Milk Products</h2>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">{product.price}</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
