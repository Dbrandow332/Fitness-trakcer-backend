const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exercise: { type: String, required: true },
    calories: { type: Number, required: true },
    duration: { type: Number, required: true }, // in minutes
    date: { type: Date, default: Date.now },    // optional, defaults to current date
});

module.exports = mongoose.model("Workout", workoutSchema);
