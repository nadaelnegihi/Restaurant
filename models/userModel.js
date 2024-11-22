const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique:true
  },
  password: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true,
    unique: true 
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  },
  
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
