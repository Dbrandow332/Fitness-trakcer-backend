const express = require("express");
const bcrypt = require("bcryptjs"); // For password hashing
const User = require("../models/User");

const router = express.Router();

// POST: Register a new user
router.post("/register", async (req, res) => {
    const { firebaseUid, name, email } = req.body;

    try {
        // Check if user already exists using firebaseUid
        const existingUser = await User.findOne({ firebaseUid });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({
            firebaseUid, // Store the Firebase UID
            name,
            email,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:firebaseUid", async (req, res) => {
    const { firebaseUid } = req.params;

    try {
        // Find user by firebaseUid
        const user = await User.findOne({ firebaseUid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});



// PUT: Update a user by ID
router.put("/:firebaseUid", async (req, res) => {
    const { firebaseUid } = req.params;

    try {
        // Find and update user by firebaseUid
        const updatedUser = await User.findOneAndUpdate(
            { firebaseUid },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
