// backend/src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const port = 3001; // Use a different port from your frontend

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://kingofworld95463:kingofworld95463@cluster0.4lpy9ir.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS (you can customize this based on your needs)
app.use(cors());

// Routes
app.use("/api", itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
