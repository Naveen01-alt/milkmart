import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderedItems, setOrderedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);


  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("orderedItems")) || [];
    const storedAmount = JSON.parse(localStorage.getItem("totalAmount")) || 0;
    setOrderedItems(storedItems);
    setTotalAmount(storedAmount);
  }, []);

  

  const handleCancelOrder = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel the order?");
    if (confirmCancel) {
      localStorage.removeItem("orderedItems"); 
      localStorage.removeItem("totalAmount"); 
      setOrderedItems([]); 
      setTotalAmount(0);
      alert("Your order has been canceled.");
      navigate("/"); 
    }
};

  return (
    <div style={styles.container}>
      <h2>📦 YOUR ORDERS</h2>

      {orderedItems.length === 0 ? (
        <p>No items ordered.</p>
      ) : (
        <>
          {orderedItems.map((item) => (
            <div key={item.id} style={styles.item}>
              <h3>{item.name}</h3>
              <p>₹{item.price} x {item.quantity}L = ₹{item.price * item.quantity}</p>
              
            </div>
          ))}

          <h3 style={styles.total}>Total Amount: ₹{totalAmount}</h3>
          <h4>YOUR ORDER WILL BE DELIVER SOON</h4>
          <h5>THANKYOU😊</h5>
        </>
      )}

      <button style={styles.button} onClick={() => navigate("/")}>
        🏠 Go to Home
      </button>
      {orderedItems.length > 0 && (
        <button style={styles.cancelButton} onClick={handleCancelOrder}>
          ❌ Cancel Order
        </button>
         
      )}
  </div>
  )
  
};


const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  item: {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px auto",
    width: "300px",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },

  total: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
    color: "#333",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
    marginTop: "20px",
  },
  cancelButton: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
    margin: "10px",
  },
  
};

export default Order;
