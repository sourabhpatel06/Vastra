import React, { useState } from 'react';
import './Contact.css'; // Optional: for styling

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = 'Name is required';
    if (!formData.email.trim()) {
      err.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) err.subject = 'Subject is required';
    if (!formData.message.trim()) err.message = 'Message is required';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      console.log('Form Submitted:', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 text-center">Contact Us</h2>
      {submitted && (
        <div className="alert alert-success text-center">
          Message sent successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Name</label>
          <input
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.subject}</div>
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <div className="invalid-feedback">{errors.message}</div>
        </div>

        <button className="btn btn-primary mt-3" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
