const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  reservation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reservation', // Optional: Links to Reservation if part of a reservation
    default: null,
  },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'menuItem', required: true }, // Menu Item
      quantity: { type: Number, required: true }, // Quantity of the item
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model('Order', orderSchema);

module.exports=orderModel;
