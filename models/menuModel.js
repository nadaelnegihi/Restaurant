const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,  // Explicitly defining _id as ObjectId
      required: true,
      auto: true,  
    },
    name: {
      type: String,
      required: true, 
      trim: true,
    },
    category: {
      type: String,
      required: true, 
      enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side'], 
    },
    description: {
      type: String, 
      required: true,
      maxlength: 500, 
    },
    price: {
      type: Number, 
      required: true,
      min: 0, 
    },
  },
);

const menuItemModel = mongoose.model('menu', MenuItemSchema);

module.exports = menuItemModel;

