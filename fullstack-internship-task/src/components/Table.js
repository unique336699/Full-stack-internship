import React, { useState } from "react";
import UpdateModal from "./UpdateModal";

const Table = ({ items, onUpdate }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleUpdate = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async (itemId) => {
    try {
      // Make a DELETE request to your server
      const response = await fetch(
        `http://localhost:3001/api/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`Item with ID ${itemId} deleted successfully`);
        // Update the local state to reflect the deletion
        onUpdate(items.filter((item) => item._id !== itemId));
      } else {
        console.error(`Failed to delete item with ID ${itemId}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <h2>Items Table</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Hobbies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.email}</td>
              <td>{item.hobbies}</td>
              <td>
                <button onClick={() => handleUpdate(item)}>Update</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <UpdateModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onUpdate={(updatedItem) => {
            // Update the local state to reflect the changes
            onUpdate(
              items.map((item) =>
                item._id === updatedItem._id ? updatedItem : item
              )
            );
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default Table;
