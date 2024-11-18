const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema(
  {
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
      min: 0, // Ensure price is non-negative
    },
  },
);

const menuItemModel = mongoose.model('menuItem', MenuItemSchema);

module.exports = menuItemModel;
