const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    table_number: {
        type: Number,
        required: true,
        unique: true, // Ensures no two tables have the same table number
    },
    isAvailable: {
        type: Boolean,
        default: true, // Indicates whether the table is available or not
    },
    capacity: {
         type: Number, 
         required: true 
    },

},{ collection: 'table' });



const tableModel = mongoose.model('table', tableSchema);

module.exports = tableModel;