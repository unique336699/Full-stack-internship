import React, { useState } from "react";

const UpdateModal = ({ item, onClose, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState({
    name: item.name,
    phoneNumber: item.phoneNumber,
    email: item.email,
    hobbies: item.hobbies,
  });

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to your server for updating
      const response = await fetch(
        `http://localhost:3001/api/items/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log(`Item with ID ${item._id} updated successfully`);
        // Call the onUpdate prop with the updated item
        onUpdate({ ...item, ...updatedData });
        onClose();
      } else {
        console.error(`Failed to update item with ID ${item._id}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={updatedData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={updatedData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Hobbies:
          <input
            type="text"
            name="hobbies"
            value={updatedData.hobbies}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateModal;
