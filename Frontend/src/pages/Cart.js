import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      alert("Could not load cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5050/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchCart();
  }, [token, navigate]);

  return (
    <div className="container pt-5">
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product._id}>
                  <td>{item.product?.title || "Product Removed"}</td>
                  <td>
                    <img
                      src={
                        item.product.image.startsWith("http")
                          ? item.product.image
                          : `http://localhost:5050${item.product.image}`
                      }
                      alt={item.product.title}
                      width="60"
                      onError={(e) => (e.target.src = "/fallback.jpg")}
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>${item.product.price}</td>
                  <td>${(item.quantity * item.product.price).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.product._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right">
            <h4>Total: ${total.toFixed(2)}</h4>
            <Link to="/checkout" className="btn btn-success mt-2">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
