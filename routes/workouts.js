const express = require("express");
const Workout = require("../models/Workout");

const router = express.Router();

// Add a workout
router.post("/", async (req, res) => {
    const { userId, exercise, calories, duration } = req.body;

    try {
        const newWorkout = new Workout({ userId, exercise, calories, duration });
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
