import React from 'react';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");
  const role = localStorage.getItem("role"); // stored during login
  const isLoggedIn = Boolean(userName);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="container-fluid mb-5">
      <div className="row border-top px-xl-5">
        {/* Sidebar */}
        <div className="col-lg-3 d-none d-lg-block">
          <button
            className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
            data-toggle="collapse"
            data-target="#navbar-vertical"
            style={{ height: '65px', marginTop: '-1px', padding: '0 30px' }}
          >
            <h6 className="m-0">Categories</h6>
            <i className="fa fa-angle-down text-dark"></i>
          </button>
          <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border" id="navbar-vertical">
            <div className="navbar-nav w-100 overflow-hidden" style={{ height: '410px' }}>
              <Link className="nav-item nav-link" to="/men">Men's Wear</Link>
              <Link className="nav-item nav-link" to="/women">Women's Wear</Link>
              <Link className="nav-item nav-link" to="/kids">Kid's Wear</Link>
            </div>
          </nav>
        </div>

        {/* Top Nav */}
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 px-0">
            <Link to="/" className="text-decoration-none d-block d-lg-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">V</span> VASTRA
              </h1>
            </Link>

            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              <div className="navbar-nav mr-auto py-0">
                <Link className="nav-item nav-link" to="/">Home</Link>
                
                <div className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" data-toggle="dropdown">Pages</span>
                  <div className="dropdown-menu rounded-0 m-0">
                    <Link className="dropdown-item" to="/cart">Shopping Cart</Link>
                    <Link className="dropdown-item" to="/checkout">Checkout</Link>
                  </div>
                </div>
                <Link className="nav-item nav-link" to="/contact">Contact</Link>
              </div>

              <div className="navbar-nav ml-auto py-0">
                {isLoggedIn ? (
                  <>
                    <span className="nav-item nav-link">Welcome, {userName}</span>
                    {role === "admin" && (
  <>
    <Link className="nav-item nav-link" to="/admin/users">Manage Users</Link>
    <Link className="nav-item nav-link" to="/admin/products">Manage Products</Link>
    <Link className="nav-item nav-link" to="/admin/orders">Orders</Link>
    
  </>
)}

                    <button className="nav-item nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link className="nav-item nav-link" to="/login">Login</Link>
                    <Link className="nav-item nav-link" to="/register">Register</Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
