// components/Form.js
import React, { useState } from "react";

const Form = ({ onSubmit }) => {
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
      // Optionally, you can reset the form after submission
      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        hobbies: "",
      });
    } else {
      alert("Name and Email are required!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}
    >
      <h2>Add New Entry</h2>
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
      <button type="submit" style={{ marginTop: "10px" }}>
        Save
      </button>
    </form>
  );
};

export default Form;
