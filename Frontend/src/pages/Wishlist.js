import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('http://localhost:5050/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setWishlist(res.data.items || []);
      })
      .catch((err) => console.error('Failed to load wishlist:', err));
  }, [token, navigate]);

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:5050/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error('Failed to remove item:', err);
      alert('Failed to remove item from wishlist');
    }
  };

  return (
    <div className="container pt-5">
      <h2 className="mb-4 text-center">💖 Your Wishlist</h2>
      <div className="row">
        {wishlist.length === 0 ? (
          <div className="col-12 text-center">
            <p>No items in wishlist.</p>
          </div>
        ) : (
          wishlist.map(({ product }) => (
            product && (
              <div className="col-lg-3 col-md-6 col-sm-12 pb-3" key={product._id}>
                <div className="card h-100">
                  <img
                    src={`http://localhost:5050${product.image}`}
                    className="card-img-top"
                    alt={product.title}
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title text-truncate">{product.title}</h6>
                    <p className="card-text">${product.price}</p>
                    <Link to={`/product/${product._id}`} className="btn btn-sm btn-outline-primary mr-2">
                      View
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromWishlist(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;
