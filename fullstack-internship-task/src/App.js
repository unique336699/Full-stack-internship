import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import Popup from "./components/Popup";

const App = () => {
  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

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
  }, []);

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
        setItems([...items, newItem]);
        setShowPopup(false);
      } else {
        console.error("Failed to add new item");
      }
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  const handleSendEmail = async (selectedRows) => {
    try {
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedRows }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div>
      <Table items={items} onUpdate={setItems} onSendEmail={handleSendEmail} />
      <button onClick={() => setShowPopup(true)}>Add New</button>
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onSubmit={(formData) => handleFormSubmit(formData)}
        />
      )}
      <Form onSubmit={(formData) => handleFormSubmit(formData)} />
    </div>
  );
};

export default App;
