// userSchema.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Ensures that the username field is not empty
  },
  email: String,
  password: {
    type: String,
    required: true, // Ensures that the password field is not empty
  },
  age: String,
  gender: String,
  address: String,
  phoneNumber: String,
  // Other fields...
});

module.exports = mongoose.model("User", userSchema);
