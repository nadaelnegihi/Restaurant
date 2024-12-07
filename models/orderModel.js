const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
  },
  reservation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reservations', 
    default: null,
  },
  items: [
    {
      item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'menuitems', required: true },
      quantity: { type: Number, required: true }, 
    },
  ],
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['order placed','in-progress', 'completed', 'canceled'],
    default: 'in-progress',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model('orders', orderSchema);

module.exports=orderModel;
