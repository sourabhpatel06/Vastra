import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Kids() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5050/api/products")
      .then((res) => {
        const kidsProducts = res.data.filter(product => product.category.toLowerCase() === "kids");
        setProducts(kidsProducts);
      })
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  const addToCart = async (productId) => {
  if (!token) return alert("Please login to add to cart");
  try {
    await axios.put(
      `http://localhost:5050/api/cart/${productId}`, // ✅ Use PUT and productId in URL
      { quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Added to cart");
  } catch (err) {
    console.error("Add to cart error:", err);
    alert("Failed to add to cart");
  }
};


  const addToWishlist = async (productId) => {
    if (!token) return alert("Please login to add to wishlist");
    try {
      await axios.post(
        "http://localhost:5050/api/wishlist",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to wishlist");
    } catch (err) {
      console.error("Add to wishlist error:", err);
      alert("Failed to add to wishlist");
    }
  };

  return (
    <div className="container-fluid pt-5">
      <div className="text-center mb-4">
        <h2 className="section-title px-5"><span className="px-2">Kids Wear</span></h2>
      </div>
      <div className="row px-xl-5 pb-3">
        {products.length === 0 ? (
          <div className="col-12 text-center">
            <p>No kids products found.</p>
          </div>
        ) : (
          products.map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={product._id}>
              <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  <img
                    className="img-fluid w-100"
                    src={`http://localhost:5050${product.image}`}
                    alt={product.title}
                    onError={(e) => { e.target.src = "/fallback.jpg"; }}
                  />
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                  <h6 className="text-truncate mb-3">{product.title}</h6>
                  <div className="d-flex justify-content-center">
                    <h6>${product.price}</h6>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                  <Link to={`/product/${product._id}`} className="btn btn-sm text-dark p-0">
                    <i className="fas fa-eye text-primary mr-1"></i>View
                  </Link>
                  <button className="btn btn-sm text-dark p-0" onClick={() => addToCart(product._id)}>
                    <i className="fas fa-shopping-cart text-primary mr-1"></i>Add
                  </button>
                  <button className="btn btn-sm text-dark p-0" onClick={() => addToWishlist(product._id)}>
                    <i className="fas fa-heart text-danger mr-1"></i>Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Kids;
