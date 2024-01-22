// components/Popup.js
import React, { useState } from "react";

const Popup = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (formData.name && formData.email) {
      onSubmit(formData);
      onClose();
    } else {
      alert("Name and Email are required!");
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Entry</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Hobbies:
            <input
              type="text"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
