const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  phoneNumber: String,
  email: String,
  hobbies: String,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
