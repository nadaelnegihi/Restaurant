const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    table_number: {
        type: Number,
        required: true,
        unique: true, // Ensures no two tables have the same table number
    },
    capacity: {
        type: Number,
        required: true, // Capacity of the table (how many people it can seat)
    },
    isAvailable: {
        type: Boolean,
        default: true, // Indicates whether the table is available or not
    },

});



const tableModel = mongoose.model('Table', tableSchema);

module.exports = tableModel;