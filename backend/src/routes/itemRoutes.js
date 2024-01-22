// routes/itemRoutes.js
const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// Get all items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add new item
router.post("/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update item by ID
router.put("/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItemData = req.body;

    // Find the item by ID and update it
    const updatedItem = await Item.findByIdAndUpdate(itemId, updatedItemData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete item by ID
router.delete("/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    // Find the item by ID and delete it
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
