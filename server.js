const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/workouts", require("./routes/workouts"));

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the Fitness Tracker API!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});