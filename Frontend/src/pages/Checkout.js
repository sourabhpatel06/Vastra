import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    mobile: "",
    address: "",
  });

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.data || res.data.length === 0) {
          alert("Cart is empty!");
          navigate("/cart");
          return;
        }

        setCartItems(res.data);
        const totalAmount = res.data.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        setTotal(totalAmount);
      } catch (err) {
        console.error("Error fetching cart:", err);
        alert("Failed to fetch cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate]);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shippingAddress.fullName || !shippingAddress.mobile || !shippingAddress.address) {
      alert("Please fill in all the fields");
      return;
    }

    try {
      await axios.post(
        "/api/orders",
        {
          items: cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          total,
          shippingAddress,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("❌ Order failed. Please try again.");
    }
  };

  if (loading) return <div className="container mt-5">Loading cart...</div>;

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={shippingAddress.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            className="form-control"
            value={shippingAddress.mobile}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit mobile number"
          />
        </div>

        <div className="form-group mb-3">
          <label>Address</label>
          <textarea
            name="address"
            className="form-control"
            rows="3"
            value={shippingAddress.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <strong>Total Amount: ₹{total.toFixed(2)}</strong>
        </div>

        <button type="submit" className="btn btn-success">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
