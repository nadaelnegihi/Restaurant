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
      min: 0, 
    },
  },
);

const menuItemModel = mongoose.model('menuitems', MenuItemSchema);

module.exports = menuItemModel;
