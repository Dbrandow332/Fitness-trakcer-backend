const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firebaseUid: { type: String, required: true, unique: true }, // Firebase UID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: null },
    goal: { type: String, default: "" },
    calorieTarget: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
