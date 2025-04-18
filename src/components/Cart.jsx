import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, increaseQuantity, decreaseQuantity }) => {
  const navigate = useNavigate(); 

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px auto", width: "300px" }}>
              <img src={item.image} alt={item.name} width="80" />
              <h3>{item.name}</h3>
              <p>₹{item.price} x {item.quantity}L = ₹{item.price * item.quantity}</p>
<button onClick={() => decreaseQuantity(item.id)}>➖</button>
<span style={{ margin: "0 10px" }}>{item.quantity}</span>
<button onClick={() => increaseQuantity(item.id)}>➕</button>
</div>
          ))}
          <h3>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
          
          <button style={{ padding: "10px 20px", background: "green", color: "white", border: "none", cursor: "pointer", marginRight: "10px" }}
            onClick={()=>navigate("/checkout",{state:{cart}})}>
            Buy Now
          </button>

          
          <button 
            onClick={() => navigate(-1)} 
            style={{ padding: "10px 20px", background: "gray", color: "white", border: "none", cursor: "pointer" }}
          >
            Go Back
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
