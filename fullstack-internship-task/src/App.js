import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import Popup from "./components/Popup";

const App = () => {
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch items from the backend
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("http://localhost:3001/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newItem = await response.json();
        setItems([...items, newItem]); // Update the table with the new item
        setShowPopup(false); // Close the popup after submission
      } else {
        console.error("Failed to add new item");
      }
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  // Auto-refresh functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchItems(); // Fetch data at regular intervals
    }, 5000); // Fetch data every 5 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [items]); // Trigger the effect whenever items change

  return (
    <div>
      <Table items={items} onUpdate={setItems} />
      <button onClick={() => setShowPopup(true)}>Add New</button>
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onSubmit={(formData) => handleFormSubmit(formData)}
        />
      )}
      {/* Use the Form component for adding new entries */}
      <Form onSubmit={(formData) => handleFormSubmit(formData)} />
    </div>
  );
};

export default App;
