// const mongoose = require("mongoose");

// // Define the schema for users and admins
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: 
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true // Ensure email is unique for all users
//   },
//   phoneNumber: {
//     type: String,
//     required: function() {
//       return this.role === 'user'; // `phoneNumber` is required for users
//     },
//     unique: true // Ensure phone number is unique
//   },
//   address: {
//     type: String,
//     required: function() {
//       return this.role === 'user'; // `address` is required for users
//     }
//   },
//   password: {
//     type: String,
//     required: true // Password is required for all users
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user', // Default role is `user`
//     required: true
//   }
// },
// );

// // Create the user model
// const userModel = mongoose.model("user", userSchema);

// module.exports = userModel;


const mongoose = require("mongoose");

// Define the schema for users and admins
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // `name` is required for both users and admins
  },
  email: {
    type: String,
    required: function () {
      return this.role === "user"; // `email` is required for users
    },
    unique: true, // Ensure email is unique for all users
  },
  phoneNumber: {
    type: String,
    required: function () {
      return this.role === "user"; // `phoneNumber` is required for users
    },
    unique: true, // Ensure phone number is unique
  },
  address: {
    type: String,
    required: function () {
      return this.role === "user"; // `address` is required for users
    },
  },
  password: {
    type: String,
    required: function () {
      return this.role === "user"; // Password is required only for users
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", // Default role is `user`
    required: true,
  },
});

// Create the user model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
