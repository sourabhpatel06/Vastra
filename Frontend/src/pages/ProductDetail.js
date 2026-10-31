import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext.js';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [displayImage, setDisplayImage] = useState('');
  const token = localStorage.getItem("token");
  const { fetchCounts } = useContext(StoreContext);

  useEffect(() => {
    axios.get(`http://localhost:5050/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.colors?.length) {
          setSelectedColor(res.data.colors[0].name);
          setDisplayImage(res.data.colors[0].image || res.data.image);
        } else {
          setDisplayImage(res.data.image);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch product details:", err);
        alert("Product not found");
      });
  }, [id]);

  const addToCart = async () => {
    if (!token) return alert("Please login to add to cart");

    if (product.sizes?.length > 0 && !selectedSize) {
      return alert("Please select a size");
    }
    if (product.colors?.length > 0 && !selectedColor) {
      return alert("Please select a color");
    }

    try {
      await axios.post(
        "http://localhost:5050/api/cart",
        {
          productId: id,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCounts(); // update cart count
      alert("Added to cart");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add to cart");
    }
  };

  const addToWishlist = async () => {
    if (!token) return alert("Please login to add to wishlist");

    if (product.sizes?.length > 0 && !selectedSize) {
      return alert("Please select a size");
    }
    if (product.colors?.length > 0 && !selectedColor) {
      return alert("Please select a color");
    }

    try {
      await axios.post(
        "http://localhost:5050/api/wishlist",
        {
          productId: id,
          size: selectedSize,
          color: selectedColor,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCounts(); // update wishlist count
      alert("Added to wishlist");
    } catch (err) {
      console.error("Add to wishlist error:", err);
      alert("Failed to add to wishlist");
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color.name);
    setDisplayImage(color.image || product.image);
  };

  if (!product) return <div className="text-center mt-5">Loading product...</div>;

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`http://localhost:5050${displayImage}`}
            alt={product.title}
            className="img-fluid"
            onError={(e) => { e.target.src = "/fallback.jpg"; }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <h4>₹{product.price}</h4>
          <p><strong>Category:</strong> {product.category}</p>
          <p>{product.description}</p>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-3">
              <strong>Size:</strong><br />
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`btn btn-outline-dark btn-sm me-2 mt-2 ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mt-3">
              <strong>Color:</strong><br />
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  className={`btn btn-sm me-2 mt-2 ${selectedColor === color.name ? 'border border-dark' : ''}`}
                  style={{
                    backgroundColor: color.name.toLowerCase(),
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: selectedColor === color.name ? '2px solid black' : '1px solid #ccc'
                  }}
                  onClick={() => handleColorSelect(color)}
                  title={color.name}
                />
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-4">
            <button className="btn btn-primary me-3" onClick={addToCart}>
              <i className="fas fa-shopping-cart me-1"></i> Add to Cart
            </button>
            <button className="btn btn-outline-danger" onClick={addToWishlist}>
              <i className="fas fa-heart me-1"></i> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
