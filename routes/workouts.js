const express = require("express");
const Workout = require("../models/Workout");
const router = express.Router();

// Add a workout
router.post("/:firebaseUid", async (req, res) => {
    const { firebaseUid } = req.params;
    const { exercise, calories, duration } = req.body;

    try {
        if (!exercise || !calories || !duration) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newWorkout = new Workout({
            userId: firebaseUid, // Use Firebase UID
            exercise,
            calories,
            duration,
        });

        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        console.error("Error adding workout:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get workouts for a user
router.get("/:userId", async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.params.userId });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
