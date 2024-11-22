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

},{ collection: 'table' });



const tableModel = mongoose.model('table', tableSchema);

module.exports = tableModel;