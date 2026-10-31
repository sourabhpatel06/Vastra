import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm.js';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5050/api/products');
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token"); // Assuming you store token here

    await axios.delete(`http://localhost:5050/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchProducts(); // Refresh product list
  } catch (error) {
    console.error("Delete failed:", error.response?.data?.message || error.message);
    alert("Unauthorized or failed to delete product");
  }
};

  return (
    <div className="container mt-4">
      <h2>Manage Products</h2>
      <ProductForm fetchProducts={fetchProducts} editProduct={editProduct} setEditProduct={setEditProduct} />
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Title</th><th>Price</th><th>Category</th><th>Image</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.title}</td>
              <td>₹{prod.price}</td>
              <td>{prod.category}</td>
              <td><img src={prod.image} width="50" /></td>
              <td>
                <button onClick={() => setEditProduct(prod)} className="btn btn-warning btn-sm">Edit</button>
                <button onClick={() => handleDelete(prod._id)} className="btn btn-danger btn-sm ms-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProducts;
