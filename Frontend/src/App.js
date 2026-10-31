import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Common Components
import TopBar from './components/TopBarComponent/TopBar.js';
import NavBar from './components/NavBarComponent/NavBar.js';
import Featured from './components/FeaturedComponent/Featured.js';
import Footer from './components/FooterComponent/Footer.js';

// Page Components
import Product from './components/ProductComponent/Product.js';
import Login from './components/LoginComponent/Login.js';
import Register from './components/RegisterComponent/Register.js';
import Mens from './components/MensComponent/Mens.js';
import Women from './components/WomensComponent/Womens.js';
import Kids from './components/KidsComponent/Kids.js';
import Shop from './pages/Shop.js';
import ShopDetail from './pages/ShopDetails.js';
import Cart from './pages/Cart.js';
import Checkout from './pages/Checkout.js';
import Contact from './pages/Contact.js';
import Wishlist from './pages/Wishlist.js';
import ProductDetail from './pages/ProductDetail.js';
import AdminOrders from './admin/AdminOrders.js';
// Admin Pages
import ManageProducts from './admin/ManageProducts.js';
import ManageUsers from './admin/ManageUsers.js';


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: redirect to homepage on refresh
    if (performance.navigation.type === 1 && location.pathname !== '/') {
      navigate('/');
    }
  }, [location, navigate]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const hideFeatured = ['/men', '/women', '/kids'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <TopBar />}
      {!isAuthPage && <NavBar />}
      {!isAuthPage && !hideFeatured && <Featured />}

      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop-detail" element={<ShopDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/men" element={<Mens />} />
        <Route path="/men/cart" element={<Cart />} /> {/* Fix for men/cart */}
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        {/* Admin Routes */}
    
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
