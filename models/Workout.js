const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
    exercise: { type: String, required: true },
    calories: { type: Number, required: true },
    duration: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Workout", workoutSchema);
