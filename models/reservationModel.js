const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
      required: true,
    },
    table_number: {
      type: Number,
      required: true,
      unique: true,
    },
    time: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'completed'], 
      default: 'active',
    },
  },
);

const reservationModel = mongoose.model('reservations', reservationSchema);

module.exports = reservationModel;
