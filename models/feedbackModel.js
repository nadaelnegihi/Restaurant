const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

    customer_id: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Refers to the User collection
        required: true,
    },

    reservation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reservations', // Refers to the Reservation collection

        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1, 
        max: 5, 

    },
    details: {
        type: String,
        required: true,
        maxlength: 500, // Limit the feedback details to 500 characters
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the feedback submission time
    },
});

const feedbackModel = mongoose.model('feedbacks', feedbackSchema);


module.exports = feedbackModel;
