import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  console.log("Checkout component rendered!");

  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);
  

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };
  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

const handleOrder = () => {
  let validationErrors = {};
  if (!customerDetails.name.trim()) validationErrors.name = "Name is required";
  if (!customerDetails.phone.trim()) validationErrors.phone = "Phone number is required";
  else if (!/^\d{10}$/.test(customerDetails.phone.trim())) validationErrors.phone = "Invalid phone number";
  if (!customerDetails.address.trim()) validationErrors.address = "Address is required";
  if (!customerDetails.pincode.trim()) validationErrors.pincode = "Pincode is required";
  else if (!/^\d{6}$/.test(customerDetails.pincode.trim())) validationErrors.pincode = "Invalid pincode";

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setLoading(true);

  fetch("http://localhost:5000/send-order", {
 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...customerDetails,
      cart,
      totalAmount
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to send order");
      }
      return response.json();
    })
    .then(data => {
      alert("Order Placed & Email Sent Successfully! ✅");
      localStorage.setItem("orderedItems", JSON.stringify(cart));
      localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
      navigate("/order", {
        state: { orderedItems: cart, totalAmount }
      });
      setCustomerDetails({ name: "", phone: "", address: "", pincode: "" });
      setLoading(false);
    })
    .catch(error => {
      alert("Something went wrong! ❌");
      console.error("Error sending order:", error);
      setLoading(false);
    });
};


  return (
    <div style={styles.container}>
      <h2>🛍️ Checkout</h2>

      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <h3>{item.name}</h3>
              <p>₹{item.price} x {item.quantity}L = ₹{item.price * item.quantity}</p>
              <button style={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>
                ❌ Remove
              </button>
            </div>
          ))}

          <h3>Total Amount: ₹{totalAmount}</h3>
          <h4 style={{ color: "gray", marginBottom: "20px" }}>- ONLY CASH ON DELIVERY -</h4>

          <div style={styles.formContainer}>
            <h3 style={styles.sectionTitle}>Customer Details</h3>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Name:</label>
              <input style={styles.input} type="text" name="name" value={customerDetails.name} onChange={handleChange} />
              {errors.name && <p style={styles.error}>{errors.name}</p>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone:</label>
              <input style={styles.input} type="text" name="phone" value={customerDetails.phone} onChange={handleChange} />
              {errors.phone && <p style={styles.error}>{errors.phone}</p>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Address:</label>
              <textarea style={styles.textarea} name="address" value={customerDetails.address} onChange={handleChange} />
              {errors.address && <p style={styles.error}>{errors.address}</p>}
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Pincode:</label>
              <input style={styles.input} type="text" name="pincode" value={customerDetails.pincode} onChange={handleChange} />
              {errors.pincode && <p style={styles.error}>{errors.pincode}</p>}
            </div>
          </div>

          <button style={styles.button} onClick={handleOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
          
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  cartItem: {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px auto",
    width: "300px",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  formContainer: {
    textAlign: "left",
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.2s",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    outline: "none",
    minHeight: "60px",
    resize: "vertical",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
    marginTop: "20px",
  },
};

export default Checkout;
