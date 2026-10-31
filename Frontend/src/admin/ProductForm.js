import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ fetchProducts, editProduct, setEditProduct }) {
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    image: null,
    sizes: [],
    colors: [], // array of { name, image }
  });

  const [colorName, setColorName] = useState('');
  const [colorImage, setColorImage] = useState('');

  const categories = ['Men', 'Women', 'Kids'];
  const sizeOptions = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    if (editProduct) {
      setForm({
        title: editProduct.title || '',
        price: editProduct.price || '',
        category: editProduct.category || '',
        description: editProduct.description || '',
        image: null,
        sizes: editProduct.sizes || [],
        colors: editProduct.colors || [],
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const addColor = () => {
    if (colorName && colorImage) {
      setForm((prev) => ({
        ...prev,
        colors: [...prev.colors, { name: colorName, image: colorImage }],
      }));
      setColorName('');
      setColorImage('');
    }
  };

  const removeColor = (index) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Admin login required');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('sizes', JSON.stringify(form.sizes));
    formData.append('colors', JSON.stringify(form.colors));
    if (form.image) formData.append('image', form.image);

    try {
      if (editProduct) {
        await axios.put(
          `http://localhost:5050/api/products/${editProduct._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post('http://localhost:5050/api/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Reset
      setForm({
        title: '',
        price: '',
        category: '',
        description: '',
        image: null,
        sizes: [],
        colors: [],
      });
      setColorName('');
      setColorImage('');
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Product upload error:', err.message);
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3" encType="multipart/form-data">
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="form-control mb-2" required />

      <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" className="form-control mb-2" required />

      <select name="category" value={form.category} onChange={handleChange} className="form-control mb-2" required>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat.toLowerCase()}>{cat}</option>
        ))}
      </select>

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="form-control mb-2" required />

      <div className="mb-2">
        <strong>Select Sizes:</strong><br />
        {sizeOptions.map((size) => (
          <label key={size} className="me-3">
            <input
              type="checkbox"
              value={size}
              checked={form.sizes.includes(size)}
              onChange={() => toggleSize(size)}
            /> {size}
          </label>
        ))}
      </div>

      <div className="mb-3">
        <strong>Add Colors:</strong>
        <div className="d-flex">
          <input type="text" value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder="Color name" className="form-control me-2" />
          <input type="text" value={colorImage} onChange={(e) => setColorImage(e.target.value)} placeholder="Image URL" className="form-control me-2" />
          <button type="button" onClick={addColor} className="btn btn-secondary">Add</button>
        </div>
        <ul className="mt-2">
          {form.colors.map((color, i) => (
            <li key={i}>
              {color.name} <img src={color.image} alt={color.name} width="30" className="ms-2" />
              <button onClick={() => removeColor(i)} type="button" className="btn btn-sm btn-danger ms-2">x</button>
            </li>
          ))}
        </ul>
      </div>

      <input type="file" name="image" onChange={handleImageChange} className="form-control mb-3" accept="image/*" />

      <button className="btn btn-primary">
        {editProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}

export default ProductForm;
