import React, { useState, useContext } from 'react';
import './TopBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.js'; // ✅ Import context

function TopBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { cartCount, wishlistCount } = useContext(StoreContext); // ✅ Use counts

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product?search=${searchTerm}`);
    }
  };

  return (
    <div className="container-fluid">
      {/* Top Info Bar */}
      <div className="row bg-secondary py-2 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block"></div>
        <div className="col-lg-6 text-center text-lg-right">
          <div className="d-inline-flex align-items-center">
            <a className="text-dark px-2" href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a className="text-dark px-2" href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
            <a className="text-dark px-2" href="https://linkedin.com" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
            <a className="text-dark px-2" href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
            <a className="text-dark pl-2" href="https://youtube.com" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Logo, Search & Icons */}
      <div className="row align-items-center py-3 px-xl-5">
        <div className="col-lg-3 d-none d-lg-block">
          <Link to="/" className="text-decoration-none">
            <h1 className="m-0 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border px-3 mr-1">V</span>VASTRA
            </h1>
          </Link>
        </div>

        <div className="col-lg-6 col-6 text-left">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="input-group-append">
                <button type="submit" className="input-group-text bg-transparent text-primary">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-lg-3 col-6 text-right">
          <Link to="/wishlist" className="btn border">
            <i className="fas fa-heart text-primary"></i>
            <span className="badge">{wishlistCount}</span>
          </Link>
          <Link to="/cart" className="btn border ml-2">
            <i className="fas fa-shopping-cart text-primary"></i>
            <span className="badge">{cartCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
