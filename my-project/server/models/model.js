const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: Array, // Array of strings
    default: [],    // Default to an empty array
  },
  description: {
    type: Array,// Array of strings
    default: [],    // Default to an empty array
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
