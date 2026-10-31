import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const token = localStorage.getItem('token');

  const fetchCounts = async () => {
    if (!token) return;

    try {
      // ✅ Fetch cart data and sum all quantities
      const cartRes = await axios.get('http://localhost:5050/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const totalCartQty = cartRes.data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setCartCount(totalCartQty);

      // ✅ Wishlist count is per item
      const wishlistRes = await axios.get('http://localhost:5050/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistCount(wishlistRes.data.items?.length || 0);
    } catch (err) {
      console.error('Error fetching cart/wishlist counts:', err);
      setCartCount(0);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    fetchCounts(); // Call initially
  }, [token]);

  return (
    <StoreContext.Provider value={{ cartCount, wishlistCount, fetchCounts }}>
      {children}
    </StoreContext.Provider>
  );
};
