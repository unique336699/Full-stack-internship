import React, { useState } from "react";
import UpdateModal from "./UpdateModal";

const Table = ({ items, onUpdate, onSendEmail }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleUpdate = (item) => {
    setSelectedItem(item);
  };

  const handleDelete = async (itemId) => {
    try {
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
        onUpdate(items.filter((item) => item._id !== itemId));
      } else {
        console.error(`Failed to delete item with ID ${itemId}`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCheckboxChange = (itemId) => {
    const updatedSelectedRows = [...selectedRows];
    const index = updatedSelectedRows.findIndex((row) => row._id === itemId);

    if (index !== -1) {
      updatedSelectedRows.splice(index, 1);
    } else {
      const selectedItem = items.find((item) => item._id === itemId);
      updatedSelectedRows.push(selectedItem);
    }

    setSelectedRows(updatedSelectedRows);
  };

  const handleSendEmailClick = () => {
    onSendEmail(selectedRows);
    setSelectedRows([]);
  };

  const handleUpdateModalClose = () => {
    setSelectedItem(null);
  };

  const handleUpdateModalUpdate = (updatedItem) => {
    onUpdate(
      items.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
    setSelectedItem(null);
  };

  return (
    <div>
      <h2>Items Table</h2>
      <button onClick={handleSendEmailClick}>Send Email</button>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Hobbies</th>
            <th>Actions</th>
            <th>Select</th>
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
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.some((row) => row._id === item._id)}
                  onChange={() => handleCheckboxChange(item._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRows.length > 0 && (
        <div>
          <h3>Selected Rows:</h3>
          <ul>
            {selectedRows.map((row) => (
              <li key={row._id}>{row.name}</li>
            ))}
          </ul>
        </div>
      )}

      {selectedRows.length === 0 && (
        <div>
          <p>No rows selected</p>
        </div>
      )}

      {selectedItem && (
        <UpdateModal
          item={selectedItem}
          onClose={handleUpdateModalClose}
          onUpdate={handleUpdateModalUpdate}
        />
      )}
    </div>
  );
};

export default Table;
